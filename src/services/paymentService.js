import { api } from './api';

/**
 * Create Stripe Checkout Session
 */
export const createCheckoutSession = async (scholarshipId, applicationData, axiosInstance = api) => {
  try {
    const response = await axiosInstance.post('/payment/create-checkout', {
      scholarshipId,
      applicationData
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Confirm payment and save application
 */
export const confirmPayment = async (sessionId, applicationData, axiosInstance = api) => {
  try {
    const response = await axiosInstance.post('/payment/confirm-payment', {
      sessionId,
      applicationData
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Save application as unpaid (when user cancels payment)
 */
export const saveApplicationUnpaid = async (scholarshipId, applicationData, axiosInstance = api) => {
  try {
    const response = await axiosInstance.post('/payment/save-unpaid', {
      scholarshipId,
      applicationData
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get application by ID
 */
export const getApplicationById = async (applicationId) => {
  try {
    const response = await api.get(`/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
