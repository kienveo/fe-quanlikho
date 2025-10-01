# Sửa lỗi Logout sau khi đăng nhập thành công

## Vấn đề
Sau khi đăng nhập thành công, user bị logout ngay lập tức do các nguyên nhân:

1. **Không nhất quán localStorage keys**: 
   - `Login.jsx` sử dụng `"authToken"` và `"authUser"`
   - `auth.js` sử dụng `'auth_token'` và `'auth_user'`

2. **API calls thất bại**: 
   - `Navbar` gọi API `/auth/aboutme` 
   - API trả về 401 → auto logout

3. **Interceptor refresh token**: 
   - `axiosInstance` cố gắng refresh token với API thật
   - API không tồn tại → gây lỗi

## Giải pháp đã áp dụng

### 1. Thống nhất localStorage keys
```javascript
// fe-quanlikho/src/utils/auth.js
export const AUTH_TOKEN_KEY = 'authToken';  // Thay vì 'auth_token'
export const AUTH_USER_KEY = 'authUser';    // Thay vì 'auth_user'
```

### 2. Mock API responses
```javascript
// fe-quanlikho/src/api/axiosInstance.js
if (MOCK_MODE) {
  // Override tất cả API calls với mock responses
  axiosInstance.get = (url, config) => createMockResponse(url, 'get', config);
  axiosInstance.post = (url, data, config) => createMockResponse(url, 'post', data);
  // ...
}
```

### 3. Mock config
```javascript
// fe-quanlikho/src/config/mockConfig.js
export const MOCK_MODE = true; // Bật mock mode
```

### 4. Cập nhật Login logic
```javascript
// fe-quanlikho/src/components/Auth/Login.jsx
import { setToken, setUser } from "../../utils/auth";

// Sử dụng auth utils thay vì localStorage trực tiếp
setToken(mockToken);
setUser(userData);
```

## Cách sử dụng

### Bật Mock Mode (Development)
```javascript
// fe-quanlikho/src/config/mockConfig.js
export const MOCK_MODE = true;
```

### Tắt Mock Mode (Production)
```javascript
// fe-quanlikho/src/config/mockConfig.js
export const MOCK_MODE = false;
```

## Tài khoản test

- **Admin**: `admin` / `admin123`
- **Manager**: `manager` / `manager123`
- **Staff**: `staff` / `staff123`

## Kiểm tra

1. Đăng nhập với tài khoản test
2. Kiểm tra console không có lỗi API
3. User không bị logout tự động
4. Sidebar hiển thị đầy đủ menu
5. Navbar hiển thị tên user đúng

## Lưu ý

- Mock mode chỉ dành cho development
- Trong production, cần tắt MOCK_MODE và sử dụng API thật
- Tất cả API calls sẽ được mock khi MOCK_MODE = true
- Không cần thay đổi code trong các component khác
