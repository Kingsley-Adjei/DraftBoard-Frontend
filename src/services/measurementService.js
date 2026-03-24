// src/services/measurementService.js
import api from "./api";

// Shirt Measurements
export const shirtService = {
  create: (sessionId, data) =>
    api.post(`/sessions/${sessionId}/measurements/shirt`, data),
  getById: (id) => api.get(`/measurements/shirts/${id}`),
  update: (id, data) => api.put(`/measurements/shirts/${id}`, data),
};

// Trouser Measurements
export const trouserService = {
  create: (sessionId, data) =>
    api.post(`/sessions/${sessionId}/measurements/trouser`, data),
  getById: (id) => api.get(`/measurements/trousers/${id}`),
  update: (id, data) => api.put(`/measurements/trousers/${id}`, data),
};

// Suit Measurements
export const suitService = {
  create: (sessionId, data) =>
    api.post(`/sessions/${sessionId}/measurements/suit`, data),
  getById: (id) => api.get(`/measurements/suits/${id}`),
  update: (id, data) => api.put(`/measurements/suits/${id}`, data),
};

// Dress Measurements
export const dressService = {
  create: (sessionId, data) =>
    api.post(`/sessions/${sessionId}/measurements/dress`, data),
  getById: (id) => api.get(`/measurements/dresses/${id}`),
  update: (id, data) => api.put(`/measurements/dresses/${id}`, data),
};

// Skirt Measurements
export const skirtService = {
  create: (sessionId, data) =>
    api.post(`/sessions/${sessionId}/measurements/skirt`, data),
  getById: (id) => api.get(`/measurements/skirts/${id}`),
  update: (id, data) => api.put(`/measurements/skirts/${id}`, data),
};

// Kaba Measurements (Ghanaian)
export const kabaService = {
  create: (sessionId, data) =>
    api.post(`/sessions/${sessionId}/measurements/kaba`, data),
  getById: (id) => api.get(`/measurements/kaba/${id}`),
  update: (id, data) => api.put(`/measurements/kaba/${id}`, data),
};

// Slit Measurements (Ghanaian)
export const slitService = {
  create: (sessionId, data) =>
    api.post(`/sessions/${sessionId}/measurements/slit`, data),
  getById: (id) => api.get(`/measurements/slit/${id}`),
  update: (id, data) => api.put(`/measurements/slit/${id}`, data),
};
