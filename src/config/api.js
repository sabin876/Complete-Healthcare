// Centralized API Configuration for Development and Deployment
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.corx.ae';
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');
export const SEND_EMAIL_URL = `${API_BASE_URL}/send-email/`;
