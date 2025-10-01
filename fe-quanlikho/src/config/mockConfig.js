// Config để bật/tắt mock mode
export const MOCK_MODE = true; // Đặt false để sử dụng API thật

// Import axios instance dựa trên config
export const getAxiosInstance = () => {
  if (MOCK_MODE) {
    return require('../api/mockAxiosInstance').default;
  } else {
    return require('../api/axiosInstance').default;
  }
};
