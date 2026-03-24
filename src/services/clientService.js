import api from "./api";

export const clientService = {
  getAll: (params) => api.get("/clients", { params }),
  getById: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post("/clients", data),
  update: (id, data) => api.put(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
  search: (query, params) =>
    api.get("/clients/search", { params: { query, ...params } }),
  getStatistics: () => api.get("/clients/statistics"),
  uploadImage: (clientId, formData) =>
    api.post(`/clients/${clientId}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getImages: (clientId) => api.get(`/clients/${clientId}/images`),
  deleteImage: (clientId, imageId) =>
    api.delete(`/clients/${clientId}/images/${imageId}`),
};
