import axios from "axios";

// Base URL của API backend
const BASE_URL = "http://localhost:8080";

// Tạo instance axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 giây
});

// Interceptor cho request: tự động thêm accessToken nếu còn hạn
axiosInstance.interceptors.request.use(
  async (config) => {
    // Bỏ qua interceptor cho các API public không cần token
    if (
      config.url.includes("/un_auth/") ||
      config.url.includes("/signup") ||
      config.url.includes("/signin") ||
      config.url.includes("/refresh") ||
      config.url.includes("/change-password")
    ) {
      return config;
    }
    const token = localStorage.getItem("authToken");
    const expiredAt = localStorage.getItem("tokenExpiredAt");
    const refreshToken = localStorage.getItem("refreshToken");
    // Nếu có token và còn hạn thì thêm vào header
    if (token && expiredAt && Date.now() < Number(expiredAt)) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }
    // Nếu token hết hạn, thử refresh
    if (refreshToken) {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/v1/un_auth/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data && res.data.status === 200 && res.data.data) {
          const {
            accessToken,
            refreshToken: newRefreshToken,
            expiresIn,
          } = res.data.data;
          localStorage.setItem("authToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          if (expiresIn) {
            const newExpiredAt = Date.now() + expiresIn * 1000;
            localStorage.setItem("tokenExpiredAt", newExpiredAt);
          }
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          return config;
        } else {
          // Refresh thất bại: không xóa token, không reload để tránh auto-logout
          return Promise.reject(new Error("Refresh token failed"));
        }
      } catch (err) {
        // Refresh thất bại: không xóa token, không reload để tránh auto-logout
        return Promise.reject(err);
      }
    }
    // Không có refreshToken hoặc không hợp lệ: bỏ qua auth cho request này, không logout
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
