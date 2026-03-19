import apiClient from "./client";

export const createPrediction = async (payload) => {
  const { data } = await apiClient.post("/predict", payload);
  return data.data;
};

export const fetchHistory = async (params) => {
  const { data } = await apiClient.get("/history", { params });
  return data.data;
};

export const fetchInsights = async () => {
  const { data } = await apiClient.get("/insights");
  return data.data;
};
