# Cập nhật Quyền Xóa User

## Thay đổi
Đã loại bỏ quyền `user.delete` cho cả **Admin** và **Manager**.

## Lý do
- Bảo mật dữ liệu user
- Tránh xóa nhầm user quan trọng
- Chỉ cho phép tạo, xem, sửa user

## Permissions mới

### Admin (admin/admin123):
```javascript
permissions: [
  "user.create",    // ✅ Tạo user
  "user.read",      // ✅ Xem user  
  "user.update",    // ✅ Sửa user
  // "user.delete", // ❌ KHÔNG có quyền xóa user
  "product.create", "product.read", "product.update", "product.delete",
  "order.create", "order.read", "order.update", "order.delete",
  "category.create", "category.read", "category.update", "category.delete",
  "report.read", "dashboard.read"
]
```

### Manager (manager/manager123):
```javascript
permissions: [
  "user.read",      // ✅ Xem user
  "user.update",    // ✅ Sửa user
  // "user.create", // ❌ KHÔNG có quyền tạo user
  // "user.delete", // ❌ KHÔNG có quyền xóa user
  "product.create", "product.read", "product.update", "product.delete",
  "order.create", "order.read", "order.update",
  "category.create", "category.read", "category.update",
  "report.read", "dashboard.read"
]
```

### Staff (staff/staff123):
```javascript
permissions: [
  "user.read",      // ✅ Xem user (chỉ xem)
  // "user.create", // ❌ KHÔNG có quyền tạo user
  // "user.update", // ❌ KHÔNG có quyền sửa user
  // "user.delete", // ❌ KHÔNG có quyền xóa user
  "product.read", "order.read", "category.read", "dashboard.read"
]
```

## Tác động

### ✅ Những gì vẫn hoạt động:
- Admin có thể tạo, xem, sửa user
- Manager có thể xem, sửa user
- Staff có thể xem user
- Tất cả menu items vẫn hiển thị

### ❌ Những gì bị thay đổi:
- **KHÔNG AI** có quyền xóa user
- Button "Xóa User" sẽ bị ẩn cho tất cả user
- RoleGuard với `user.delete` sẽ không cho phép truy cập

## Demo

Sử dụng `UserManagementDemo` component để test:
```jsx
import UserManagementDemo from '../components/Demo/UserManagementDemo';

<UserManagementDemo />
```

Component này sẽ hiển thị:
- Badge permissions hiện tại
- Buttons chỉ hiển thị khi có quyền
- RoleGuard demo cho từng quyền

## Cách test

1. **Đăng nhập Admin**:
   - Button "Tạo User" ✅ hiển thị
   - Button "Xem User" ✅ hiển thị  
   - Button "Sửa User" ✅ hiển thị
   - Button "Xóa User" ❌ ẩn

2. **Đăng nhập Manager**:
   - Button "Tạo User" ❌ ẩn
   - Button "Xem User" ✅ hiển thị
   - Button "Sửa User" ✅ hiển thị
   - Button "Xóa User" ❌ ẩn

3. **Đăng nhập Staff**:
   - Button "Tạo User" ❌ ẩn
   - Button "Xem User" ✅ hiển thị
   - Button "Sửa User" ❌ ẩn
   - Button "Xóa User" ❌ ẩn

## Lưu ý

- Thay đổi này áp dụng ngay lập tức
- Không cần restart server
- Tất cả user hiện tại sẽ bị ảnh hưởng
- Nếu cần khôi phục quyền xóa, thêm lại `"user.delete"` vào permissions
