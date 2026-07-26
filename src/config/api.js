// Centralized API Configuration for Development and Deployment
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://sabinsiwakoti.com.np';
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

