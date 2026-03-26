// src/services/clientService.js
import api from "./api";

export const clientService = {
  // Get all clients with pagination and filters
  getAll: (params) => api.get("/clients", { params }),

  // Get client by ID
  getById: (id) => api.get(`/clients/${id}`),

  // Create new client
  create: (data) => api.post("/clients", data),

  // Update client
  update: (id, data) => api.put(`/clients/${id}`, data),

  // Delete client
  delete: (id) => api.delete(`/clients/${id}`),

  // Search clients
  search: (query, params) =>
    api.get("/clients/search", { params: { query, ...params } }),

  // Get client statistics
  getStatistics: () => api.get("/clients/statistics"),

  // Upload client image
  uploadImage: (clientId, formData) =>
    api.post(`/clients/${clientId}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Get client images
  getImages: (clientId) => api.get(`/clients/${clientId}/images`),

  // Delete client image
  deleteImage: (clientId, imageId) =>
    api.delete(`/clients/${clientId}/images/${imageId}`),
};
