import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenStorage } from './storage'; // MMKV token storage module

// Define API base URL
const BASE_URL = 'http://ajeek.qbscocloud.net:31112';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh tokens
// Function to refresh tokens with enhanced logging
const refreshAuthToken = async (): Promise<boolean> => {
  try {
    const refreshToken = tokenStorage.getRefreshToken();
    const accessToken = tokenStorage.getToken();

    console.log('[Token Refresh] Current Refresh Token:', refreshToken ? '**exists**' : 'missing');
    console.log('[Token Refresh] Current Access Token:', accessToken ? '**exists**' : 'missing');

    if (!refreshToken || !accessToken) {
      console.warn('[Token Refresh] Missing refresh or access token.');
      return false;
    }

    const response = await axios.post(
      `${BASE_URL}/Auth/IAuthFeature/RefreshToken`,
      { accessToken, refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('[Token Refresh] Response status:', response.status);
    console.log('[Token Refresh] Response structure:', JSON.stringify({
      isApiHandled: response.data.isApiHandled,
      isRequestSuccess: response.data.isRequestSuccess,
      statusCode: response.data.statusCode,
      message: response.data.message,
      hasData: !!response.data.data,
      dataKeys: response.data.data ? Object.keys(response.data.data) : []
    }));

    // Check for the response structure with nested data property
    if (response.status === 200 && response.data && response.data.data) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

      if (newAccessToken && newRefreshToken) {
        tokenStorage.saveToken(newAccessToken);
        tokenStorage.saveRefreshToken(newRefreshToken);
        console.log('[Token Refresh] Tokens refreshed successfully.');
        return true;
      } else {
        console.warn('[Token Refresh] Missing new tokens in response data:', 
          'accessToken:', !!newAccessToken, 
          'refreshToken:', !!newRefreshToken);
      }
    } else {
      console.warn('[Token Refresh] Unexpected response structure:', 
        'status:', response.status,
        'hasData:', !!response.data,
        'hasNestedData:', !!(response.data && response.data.data));
    }
  } catch (error: any) {
    console.error('[Token Refresh] Failed to refresh tokens:', error.message);
    if (error.response) {
      console.error('[Token Refresh] Error response:', {
        status: error.response.status,
        data: error.response.data
      });
    }
  }

  return false;
};

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log('[API Request] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      const refreshed = await refreshAuthToken();

      if (refreshed) {
        const newToken = tokenStorage.getToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest); // Retry the original request
        }
      } else {
        console.warn('[API Response] Token refresh failed. Logging out.');
        // Do NOT clear existing tokens unless you want to force logout
        // tokenStorage.clearTokens();
        // navigateToLogin();
      }
    }

    console.error('[API Response] Response error:', error);
    console.log('error in response', error?.response)
    return Promise.reject(error);
  }
);

export default api;
