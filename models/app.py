# app.py
from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# Load trained model
model = pickle.load(open("model.pkl", "rb"))

# 🔥 IMPORTANT: Load location encoding (same as training)
location_mean = pickle.load(open("location_mean.pkl", "rb"))

# ----------- Helper Functions -----------

def preprocess_input(data):
    df = pd.DataFrame([data])

    # Encode location using target encoding
    df["location_encoded"] = df["location"].map(location_mean)
    df.drop("location", axis=1, inplace=True)

    # One-hot encoding for furnishing (ensure same columns)
    furnishing_cols = ["furnishing_Semi-Furnished", "furnishing_Unfurnished"]

    for col in furnishing_cols:
        df[col] = 0

    if data["furnishing"] == "Semi-Furnished":
        df["furnishing_Semi-Furnished"] = 1
    elif data["furnishing"] == "Unfurnished":
        df["furnishing_Unfurnished"] = 1

    df.drop("furnishing", axis=1, inplace=True)

    return df


def predict_price(input_df):
    pred_log = model.predict(input_df)[0]
    price = np.exp(pred_log)

    # Simple uncertainty range
    std = price * 0.1
    lower = price - std
    upper = price + std

    return price, lower, upper


def get_recommendation(price, location):
    avg_price = location_mean.get(location, price)

    if price < avg_price:
        return "Good Deal"
    else:
        return "Overpriced"


# ----------- API Routes -----------

@app.route("/")
def home():
    return "House Price Prediction API Running 🚀"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Preprocess
        input_df = preprocess_input(data)

        # Prediction
        price, lower, upper = predict_price(input_df)

        # Recommendation
        recommendation = get_recommendation(price, data["location"])

        return jsonify({
            "predicted_price": round(price, 2),
            "price_range": [round(lower, 2), round(upper, 2)],
            "recommendation": recommendation
        })

    except Exception as e:
        return jsonify({"error": str(e)})


# ----------- Run App -----------

if __name__ == "__main__":
    app.run(debug=True)