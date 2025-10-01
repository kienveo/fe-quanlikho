# Sửa lỗi Phân quyền - Admin và Staff không xem được menu

## Vấn đề
- Admin không xem được phần "Người dùng" trong sidebar
- Staff không xem được phần "Người dùng" trong sidebar

## Nguyên nhân
1. **DashboardLayout đang sử dụng Sidebar thông thường** thay vì `SidebarWithPermissions`
2. **Staff không có permission `user.read`** để xem menu người dùng

## Giải pháp đã áp dụng

### 1. Cập nhật DashboardLayout
```javascript
// fe-quanlikho/src/components/Layout/DashboardLayout.jsx
import SidebarWithPermissions from "../Common/SidebarWithPermissions";

// Thay vì
import Sidebar from "../Common/Sidebar";
```

### 2. Cập nhật permissions cho Staff
```javascript
// fe-quanlikho/src/utils/mockUsers.js
{
  id: 3,
  username: "staff",
  // ...
  permissions: [
    "product.read",
    "order.read", 
    "category.read",
    "dashboard.read",
    "user.read" // ✅ Thêm permission này
  ]
}
```

### 3. Tạo component debug
- `PermissionDebug.jsx`: Hiển thị chi tiết permissions của user hiện tại
- `PermissionTest.jsx`: Test phân quyền với các tài khoản khác nhau

## Kết quả

### ✅ Admin (admin/admin123):
- Xem được TẤT CẢ menu items
- Có quyền: user.create, user.read, user.update (KHÔNG có user.delete)
- Có quyền: product.create, product.read, product.update, product.delete
- Có quyền: order.create, order.read, order.update, order.delete
- Có quyền: category.create, category.read, category.update, category.delete
- Có quyền: report.read, dashboard.read

### ✅ Manager (manager/manager123):
- Xem được hầu hết menu items
- Có quyền: user.read, user.update (không có user.create, user.delete)
- Có quyền: product.create, product.read, product.update, product.delete
- Có quyền: order.create, order.read, order.update (không có order.delete)
- Có quyền: category.create, category.read, category.update (không có category.delete)
- Có quyền: report.read, dashboard.read

### ✅ Staff (staff/staff123):
- Xem được menu cơ bản
- Có quyền: user.read (chỉ xem, không tạo/sửa/xóa)
- Có quyền: product.read (chỉ xem)
- Có quyền: order.read (chỉ xem)
- Có quyền: category.read (chỉ xem)
- Có quyền: dashboard.read

## Cách test

### 1. Test với tài khoản Admin:
```
Username: admin
Password: admin123
```
- Kiểm tra sidebar hiển thị đầy đủ 6 menu items
- Kiểm tra có thể truy cập tất cả các trang

### 2. Test với tài khoản Manager:
```
Username: manager  
Password: manager123
```
- Kiểm tra sidebar hiển thị 6 menu items
- Kiểm tra có thể truy cập các trang

### 3. Test với tài khoản Staff:
```
Username: staff
Password: staff123
```
- Kiểm tra sidebar hiển thị 6 menu items (bao gồm "Người dùng")
- Kiểm tra chỉ có thể xem dữ liệu, không thể tạo/sửa/xóa

## Debug

### Sử dụng PermissionDebug component:
```jsx
import PermissionDebug from '../components/Debug/PermissionDebug';

// Hiển thị chi tiết permissions của user hiện tại
<PermissionDebug />
```

### Sử dụng PermissionTest component:
```jsx
import PermissionTest from '../components/Demo/PermissionTest';

// Test phân quyền với các tài khoản khác nhau
<PermissionTest />
```

## Lưu ý

- Sidebar bây giờ sử dụng `SidebarWithPermissions` để áp dụng phân quyền
- Tất cả menu items sẽ được lọc theo permissions của user
- Nếu user không có permission, menu item sẽ bị ẩn
- Staff bây giờ có thể xem menu "Người dùng" nhưng chỉ có quyền đọc
