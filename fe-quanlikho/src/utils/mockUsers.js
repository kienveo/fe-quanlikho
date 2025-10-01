// Mock data cho users - không cần database
export const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "admin123", // Trong thực tế nên hash password
    role: "Admin",
    name: "Administrator",
    permissions: [
      "user.create",
      "user.read", 
      "user.update",
      "product.create",
      "product.read",
      "product.update", 
      "product.delete",
      "order.create",
      "order.read",
      "order.update",
      "order.delete",
      "category.create",
      "category.read",
      "category.update",
      "category.delete",
      "report.read",
      "dashboard.read"
    ]
  },
  {
    id: 2,
    username: "manager",
    email: "manager@example.com", 
    password: "manager123",
    role: "Manager",
    name: "Manager User",
    permissions: [
      "user.read",
      "user.update",
      "product.create",
      "product.read",
      "product.update",
      "product.delete",
      "order.create", 
      "order.read",
      "order.update",
      "category.create",
      "category.read",
      "category.update",
      "report.read",
      "dashboard.read"
    ]
  },
  {
    id: 3,
    username: "staff",
    email: "staff@example.com",
    password: "staff123", 
    role: "Staff",
    name: "Staff User",
    permissions: [
      "product.read",
      "order.read",
      "category.read",
      "dashboard.read",
      "user.read" // Staff có thể xem danh sách user nhưng không thể tạo/sửa/xóa
    ]
  }
];

// Hàm tìm user theo username/email
export function findUserByCredentials(username, password) {
  return MOCK_USERS.find(user => 
    (user.username === username || user.email === username) && 
    user.password === password
  );
}

// Hàm kiểm tra quyền
export function hasPermission(user, permission) {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

// Hàm kiểm tra role
export function hasRole(user, role) {
  if (!user) return false;
  return user.role === role;
}
