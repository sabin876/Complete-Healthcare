// Centralized API Configuration for Development and Deployment
const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' || 
   window.location.hostname.startsWith('192.168.'));

const defaultUrl = isLocal ? 'http://localhost:8000' : 'https://api.corx.ae';
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || defaultUrl;
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

