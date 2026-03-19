import apiClient from "./client";

export const register = async (payload) => {
  const { data } = await apiClient.post("/auth/register", payload);
  return data.data;
};

export const login = async (payload) => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data.data;
};

export const loginWithGoogle = async (credential) => {
  const { data } = await apiClient.post("/auth/google", { credential });
  return data.data;
};

export const fetchCurrentUser = async () => {
  const { data } = await apiClient.get("/auth/me");
  return data.data;
};
