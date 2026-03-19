import Prediction from "../models/Prediction.js";
import { createPrediction } from "../services/predictionService.js";

const buildInsightPayload = async () => {
  const [locationAverages, timeline, scatterData, totals] = await Promise.all([
    Prediction.aggregate([
      {
        $group: {
          _id: "$location",
          averagePrice: { $avg: "$predicted_price" },
          predictions: { $sum: 1 }
        }
      },
      { $sort: { averagePrice: -1 } }
    ]),
    Prediction.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" }
          },
          predictions: { $sum: 1 },
          averagePrice: { $avg: "$predicted_price" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]),
    Prediction.find({}, { area_sqft: 1, predicted_price: 1, location: 1, created_at: 1 })
      .sort({ created_at: 1 })
      .lean(),
    Prediction.aggregate([
      {
        $group: {
          _id: null,
          totalPredictions: { $sum: 1 },
          averagePrice: { $avg: "$predicted_price" },
          averageArea: { $avg: "$area_sqft" }
        }
      }
    ])
  ]);

  return {
    summary: totals[0] || { totalPredictions: 0, averagePrice: 0, averageArea: 0 },
    averagePriceByLocation: locationAverages.map((item) => ({
      location: item._id,
      averagePrice: Number(item.averagePrice.toFixed(2)),
      predictions: item.predictions
    })),
    predictionTimeline: timeline.map((item) => ({
      label: `${String(item._id.month).padStart(2, "0")}/${item._id.year}`,
      predictions: item.predictions,
      averagePrice: Number(item.averagePrice.toFixed(2))
    })),
    priceVsArea: scatterData.map((item) => ({
      area: item.area_sqft,
      price: item.predicted_price,
      location: item.location,
      createdAt: item.created_at
    })),
    featureImportance: [
      { name: "Area", importance: 92 },
      { name: "Location", importance: 87 },
      { name: "BHK", importance: 74 },
      { name: "Bathrooms", importance: 59 },
      { name: "Furnishing", importance: 41 }
    ]
  };
};

export const postPrediction = async (req, res, next) => {
  try {
    const prediction = await createPrediction(req.body);
    res.status(201).json({
      success: true,
      data: prediction
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { search = "", location = "" } = req.query;
    const query = {};

    if (location) {
      query.location = location;
    }

    if (search) {
      query.$or = [
        { location: { $regex: search, $options: "i" } },
        { furnishing: { $regex: search, $options: "i" } },
        { recommendation: { $regex: search, $options: "i" } }
      ];
    }

    const history = await Prediction.find(query).sort({ created_at: -1 }).lean();

    res.json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

export const getInsights = async (_req, res, next) => {
  try {
    const insights = await buildInsightPayload();
    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    next(error);
  }
};
