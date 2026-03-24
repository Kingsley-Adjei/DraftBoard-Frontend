// src/services/templateService.js
import api from "./api";

export const templateService = {
  // Get all templates
  getAll: (params) => api.get("/templates", { params }),

  // Get template by ID
  getById: (id) => api.get(`/templates/${id}`),

  // Create new template
  create: (data) => api.post("/templates", data),

  // Update template
  update: (id, data) => api.put(`/templates/${id}`, data),

  // Delete template
  delete: (id) => api.delete(`/templates/${id}`),

  // Search templates
  search: (query, params) =>
    api.get("/templates/search", { params: { query, ...params } }),

  // Get templates by garment type
  getByGarmentType: (type) => api.get(`/templates/garment/${type}`),

  // Get shared templates
  getShared: () => api.get("/templates/shared"),

  // Apply template to session
  applyToSession: (templateId, sessionId, data) =>
    api.post(`/templates/${templateId}/apply/${sessionId}`, data),

  // Toggle template sharing
  toggleShare: (id, data) => api.put(`/templates/${id}/share`, data),
};
