// src/api/api.js
import axios from 'axios';

let store; // this will hold a reference to your AuthContext functions
// console.log(import.meta.env.VITE_API_URL)
const baseURL = import.meta.env.VITE_API_URL
// console.log(baseURL)

export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request Interceptor → attach access token
api.interceptors.request.use(
  (config) => {
    const token = store?.accessToken;
    // console.log("Request Interceptor - Attaching Token:", token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor → auto refresh when token expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("Interceptor caught error:", error.response?.status, error.config.url); 
    const originalRequest = error.config;

    // If token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
        // console.log("Attempting refresh...")
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // update AuthContext after refreshtoken has sent the fresh access token and the user in response.
        store.setAccessToken(res.data.accessToken);
        store.setUser(res.data.user);

        // retry original request
        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        //we are directly using axios because calling api(axios instande) was actually overwriting the new accesstoken with older.(see word document of errors on the desktop for more)
        return axios({
          ...originalRequest,
          headers:{ ...originalRequest.headers,
          },
          withCredentials: true,
        })
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        store.logout(); // clear user & redirect if needed
      }
    }

    return Promise.reject(error);
  }
);

export default api;
