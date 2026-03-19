import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    area_sqft: { type: Number, required: true },
    bhk: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    parking: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    furnishing: { type: String, required: true, trim: true },
    predicted_price: { type: Number, required: true },
    price_range: {
      type: [Number],
      required: true,
      validate: {
        validator: (value) => value.length === 2,
        message: "price_range must contain [min, max]"
      }
    },
    recommendation: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;
