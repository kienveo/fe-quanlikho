# Hệ thống Phân quyền không cần Database

## Tổng quan
Hệ thống phân quyền này được thiết kế để hoạt động mà không cần database, sử dụng mock data được lưu trữ trong localStorage.

## Cấu trúc

### 1. Mock Users (`src/utils/mockUsers.js`)
- Chứa danh sách users với roles và permissions
- Các tài khoản demo:
  - **Admin**: username: `admin`, password: `admin123`
  - **Manager**: username: `manager`, password: `manager123`  
  - **Staff**: username: `staff`, password: `staff123`

### 2. Roles và Permissions

#### Roles:
- **Admin**: Toàn quyền truy cập
- **Manager**: Quyền quản lý (không có quyền xóa user)
- **Staff**: Chỉ xem dữ liệu

#### Permissions:
- `user.create`, `user.read`, `user.update`, `user.delete`
- `product.create`, `product.read`, `product.update`, `product.delete`
- `order.create`, `order.read`, `order.update`, `order.delete`
- `category.create`, `category.read`, `category.update`, `category.delete`
- `report.read`
- `dashboard.read`

#### Phân quyền chi tiết:

**Admin (admin/admin123)**:
- ✅ Tất cả quyền (toàn quyền)
- ✅ Xem, tạo, sửa user (không xóa user)
- ✅ Xem, tạo, sửa, xóa sản phẩm
- ✅ Xem, tạo, sửa, xóa đơn hàng
- ✅ Xem, tạo, sửa, xóa danh mục
- ✅ Xem báo cáo và dashboard

**Manager (manager/manager123)**:
- ✅ Xem, sửa user (không tạo/xóa)
- ✅ Xem, tạo, sửa, xóa sản phẩm
- ✅ Xem, tạo, sửa đơn hàng (không xóa)
- ✅ Xem, tạo, sửa danh mục (không xóa)
- ✅ Xem báo cáo và dashboard

**Staff (staff/staff123)**:
- ✅ Xem user (chỉ xem)
- ✅ Xem sản phẩm (chỉ xem)
- ✅ Xem đơn hàng (chỉ xem)
- ✅ Xem danh mục (chỉ xem)
- ✅ Xem dashboard

## Cách sử dụng

### 1. Bảo vệ Routes với RoleGuard

```jsx
import { RoleGuard } from '../components/Common';

// Bảo vệ theo role
<RoleGuard requiredRoles={['Admin']}>
  <AdminOnlyComponent />
</RoleGuard>

// Bảo vệ theo permission
<RoleGuard requiredPermissions={['user.create']}>
  <CreateUserButton />
</RoleGuard>

// Kết hợp cả hai
<RoleGuard 
  requiredRoles={['Admin', 'Manager']} 
  requiredPermissions={['user.update']}
>
  <UpdateUserForm />
</RoleGuard>
```

### 2. Kiểm tra quyền trong code

```jsx
import { getUser } from '../utils/auth';
import { hasRole, hasPermission } from '../utils/mockUsers';

const user = getUser();

// Kiểm tra role
if (hasRole(user, 'Admin')) {
  // Logic cho Admin
}

// Kiểm tra permission
if (hasPermission(user, 'user.create')) {
  // Logic cho user có quyền tạo user
}
```

### 3. Hiển thị menu theo quyền

Có 2 loại Sidebar:

**Sidebar thông thường** (hiển thị tất cả menu):
```jsx
import { Sidebar } from '../components/Common';
<Sidebar />
```

**SidebarWithPermissions** (ẩn menu theo quyền):
```jsx
import { SidebarWithPermissions } from '../components/Common';
<SidebarWithPermissions />
```

## Tính năng

### ✅ Đã hoàn thành:
- [x] Mock data cho users với roles và permissions
- [x] Logic đăng nhập sử dụng mock data
- [x] Component RoleGuard để bảo vệ routes
- [x] Sidebar hiển thị menu theo quyền
- [x] Hiển thị thông tin user trong sidebar

### 🔧 Cách thêm user mới:

1. Mở file `src/utils/mockUsers.js`
2. Thêm user mới vào array `MOCK_USERS`:

```javascript
{
  id: 4,
  username: "newuser",
  email: "newuser@example.com",
  password: "password123",
  role: "Manager", // hoặc "Admin", "Staff"
  name: "New User",
  permissions: [
    "product.read",
    "order.read",
    "dashboard.read"
  ]
}
```

### 🔧 Cách thêm permission mới:

1. Thêm permission vào danh sách permissions của user
2. Sử dụng permission trong RoleGuard:

```jsx
<RoleGuard requiredPermissions={['new.permission']}>
  <NewFeatureComponent />
</RoleGuard>
```

 

## Lưu ý

- Hệ thống này chỉ dành cho development/demo
- Trong production, cần thay thế bằng database thật
- Passwords được lưu dạng plain text (chỉ dành cho demo)
- Token được tạo mock, không có validation thật

## Mở rộng

Để mở rộng hệ thống:
1. Thêm roles mới vào `ROLES` object
2. Thêm permissions mới vào user permissions
3. Cập nhật logic trong RoleGuard nếu cần
4. Thêm validation cho permissions phức tạp hơn
