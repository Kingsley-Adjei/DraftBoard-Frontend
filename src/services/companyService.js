import api from "./api";

export const companyService = {
  // ==================== Company CRUD ====================

  /**
   * Create a new company (for owner)
   */
  createCompany: (data) => api.post("/companies", data),

  /**
   * Get all companies (admin only)
   */
  getAllCompanies: () => api.get("/companies"),

  /**
   * Get company details by ID
   */
  getCompanyDetails: (companyId) => api.get(`/companies/${companyId}`),

  /**
   * Update company information
   */
  updateCompany: (companyId, data) => api.put(`/companies/${companyId}`, data),

  /**
   * Delete company
   */
  deleteCompany: (companyId) => api.delete(`/companies/${companyId}`),

  /**
   * Get current user's companies (both owner and employee)
   */
  getMyCompanies: () => api.get("/companies/my"),

  // ==================== Member Management ====================

  /**
   * Invite a member to join company
   */
  inviteMember: (companyId, data) =>
    api.post(`/companies/${companyId}/invite`, data),

  /**
   * Get invitation details by token
   */
  getInvitationDetails: (token) => api.get(`/companies/invitations/${token}`),

  /**
   * Accept invitation
   */
  acceptInvitation: (token, data) =>
    api.put(`/companies/invitations/${token}/accept`, data),

  /**
   * Reject invitation
   */
  rejectInvitation: (token, data) =>
    api.put(`/companies/invitations/${token}/reject`, data),

  /**
   * Get all members of a company
   */
  getCompanyMembers: (companyId) => api.get(`/companies/${companyId}/members`),

  /**
   * Remove a member from company
   */
  removeMember: (companyId, userId) =>
    api.delete(`/companies/${companyId}/members/${userId}`),

  // ==================== Statistics & Details ====================

  /**
   * Get company statistics (members, clients, sessions)
   */
  getCompanyStatistics: (companyId) =>
    api.get(`/companies/${companyId}/statistics`),

  /**
   * Get company detailed information with members and stats
   */
  getCompanyDetailsWithStats: (companyId) =>
    api.get(`/companies/${companyId}/details`),

  // ==================== Helper Methods ====================

  /**
   * Check if user is owner of a company
   */
  isCompanyOwner: async (companyId) => {
    try {
      const response = await api.get(`/companies/${companyId}`);
      return response.data.data.ownerId === localStorage.getItem("userId");
    } catch (error) {
      console.error("Error checking company ownership:", error);
      return false;
    }
  },

  /**
   * Get user's role in company
   */
  getUserCompanyRole: async (companyId) => {
    try {
      const members = await companyService.getCompanyMembers(companyId);
      const currentUserId = localStorage.getItem("userId");
      const member = members.data.data.find((m) => m.userId === currentUserId);
      return member?.memberRole || null;
    } catch (error) {
      console.error("Error getting user role:", error);
      return null;
    }
  },
};
