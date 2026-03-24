import api from "./api";

export const sessionService = {
  getAll: (params) => api.get("/sessions", { params }),
  getById: (id) => api.get(`/sessions/${id}`),
  create: (data) => api.post("/sessions", data),
  update: (id, data) => api.put(`/sessions/${id}`, data),
  delete: (id) => api.delete(`/sessions/${id}`),
  getByClient: (clientId, params) =>
    api.get(`/sessions/client/${clientId}`, { params }),
  search: (query, params) =>
    api.get("/sessions/search", { params: { query, ...params } }),
};
