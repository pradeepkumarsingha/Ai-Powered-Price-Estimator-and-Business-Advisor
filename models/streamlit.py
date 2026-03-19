import streamlit as st
import pickle
import numpy as np
import pandas as pd

# ----------- Load Model & Encodings -----------

model = pickle.load(open("model.pkl", "rb"))
location_mean = pickle.load(open("location_mean.pkl", "rb"))

# ----------- Page Config -----------

st.set_page_config(page_title="House Price Predictor", layout="wide")

st.title("🏠 AI House Price Prediction System")
st.markdown("Predict property prices and get investment insights")

# ----------- Sidebar Inputs -----------

st.sidebar.header("Enter Property Details")

area = st.sidebar.slider("Area (sqft)", 500, 5000, 1500)
bhk = st.sidebar.selectbox("BHK", [1, 2, 3, 4, 5])
bathrooms = st.sidebar.selectbox("Bathrooms", [1, 2, 3, 4])

parking = st.sidebar.selectbox("Parking", [0, 1, 2, 3])

location = st.sidebar.selectbox(
    "Location",
    list(location_mean.keys())
)

furnishing = st.sidebar.selectbox(
    "Furnishing",
    ["Furnished", "Semi-Furnished", "Unfurnished"]
)

# ----------- Preprocessing -----------

def preprocess_input():
    df = pd.DataFrame([{
        "area_sqft": area,
        "bhk": bhk,
        "bathroom": bathrooms,
        "parking": parking,
        "location": location
    }])

    # -------- Target Encoding --------
    df["location_encoded"] = df["location"].map(location_mean)

    # Handle unknown locations
    df["location_encoded"].fillna(
        np.mean(location_mean),
        inplace=True
    )

    df.drop("location", axis=1, inplace=True)

    # -------- One-Hot Encoding --------
    df["furnishing_Semi-Furnished"] = 1 if furnishing == "Semi-Furnished" else 0
    df["furnishing_Unfurnished"] = 1 if furnishing == "Unfurnished" else 0

    # -------- IMPORTANT: Correct Feature Order --------
    final_cols = [
        'area_sqft',
        'bhk',
        'bathroom',
        'parking',
        'furnishing_Semi-Furnished',
        'furnishing_Unfurnished',
        'location_encoded'
    ]

    df = df.reindex(columns=final_cols, fill_value=0)

    return df

# ----------- Prediction -----------

def predict():
    input_df = preprocess_input()

    pred_log = model.predict(input_df)[0]
    price = np.exp(pred_log)

    # Price Range
    lower = price * 0.9
    upper = price * 1.1

    # Investment Insight
    avg_price = location_mean.get(location, price)

    if price < avg_price:
        rec = "✅ Good Deal"
    else:
        rec = "⚠️ Slightly Expensive"

    return price, lower, upper, rec

# ----------- Button -----------

if st.button("Predict Price 💰"):
    with st.spinner("Predicting price..."):
        price, lower, upper, rec = predict()

    st.subheader("📊 Prediction Result")

    col1, col2, col3 = st.columns(3)

    col1.metric("Predicted Price (₹ Lakhs)", f"{round(price, 2)}")
    col2.metric("Lower Range", f"{round(lower, 2)}")
    col3.metric("Upper Range", f"{round(upper, 2)}")

    st.markdown("---")

    st.subheader("💡 Investment Insight")
    st.success(rec)

# ----------- Footer -----------

st.markdown("---")
st.markdown("Built with ❤️ using Machine Learning & Streamlit")