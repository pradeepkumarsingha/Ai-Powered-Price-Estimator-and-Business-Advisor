from pathlib import Path
from flask import Flask, request, jsonify
import joblib
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent

# model = pickle.load(open(BASE_DIR / "model.pkl", "rb"))
# location_mean = pickle.load(open(BASE_DIR / "location_mean.pkl", "rb"))
model = joblib.load(BASE_DIR / "model.pkl")
location_mean = joblib.load(BASE_DIR / "location_mean.pkl")

FINAL_COLS = [
    "area_sqft",
    "bhk",
    "bathroom",
    "parking",
    "furnishing_Semi-Furnished",
    "furnishing_Unfurnished",
    "location_encoded"
]


def preprocess_input(data):
    df = pd.DataFrame([
        {
            "area_sqft": data["area_sqft"],
            "bhk": data["bhk"],
            "bathroom": data["bathrooms"],
            "parking": data["parking"],
            "location": data["location"]
        }
    ])

    df["location_encoded"] = df["location"].map(location_mean)
    df["location_encoded"] = df["location_encoded"].fillna(float(np.mean(location_mean)))
    df.drop("location", axis=1, inplace=True)

    df["furnishing_Semi-Furnished"] = 1 if data["furnishing"] == "Semi-Furnished" else 0
    df["furnishing_Unfurnished"] = 1 if data["furnishing"] == "Unfurnished" else 0

    df = df.reindex(columns=FINAL_COLS, fill_value=0)

    return df


def predict_price(input_df):
    pred_log = model.predict(input_df)[0]
    price = np.exp(pred_log)
    lower = price * 0.9
    upper = price * 1.1
    return price, lower, upper


def get_recommendation(price, location):
    avg_price = location_mean.get(location, price)
    if price < avg_price:
        return "Good Deal"
    return "Overpriced"


@app.route("/")
def home():
    return "House Price Prediction API Running"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json or {}
        required_fields = ["area_sqft", "bhk", "bathrooms", "parking", "location", "furnishing"]
        missing = [field for field in required_fields if field not in data]
        if missing:
            return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

        input_df = preprocess_input(data)
        price, lower, upper = predict_price(input_df)
        recommendation = get_recommendation(price, data["location"])

        return jsonify(
            {
                "predicted_price": round(float(price), 2),
                "price_range": [round(float(lower), 2), round(float(upper), 2)],
                "recommendation": recommendation
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render provides PORT
    app.run(host="0.0.0.0", port=port,debug=False)