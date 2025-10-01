import React from 'react';
import { getUser } from '../../utils/auth';
import { hasRole, hasPermission } from '../../utils/mockUsers';
import RoleGuard from '../Common/RoleGuard';

const RoleDemo = () => {
  const user = getUser();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>Demo Hệ thống Phân quyền</h2>
          <p className="text-muted">Hệ thống phân quyền không cần database</p>
          
          {user ? (
            <div className="card">
              <div className="card-header">
                <h5>Thông tin User hiện tại</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Tên:</strong> {user.name}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> <span className="badge bg-primary">{user.role}</span></p>
                  </div>
                  <div className="col-md-6">
                    <h6>Permissions:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {user.permissions?.map((permission, index) => (
                        <span key={index} className="badge bg-secondary">{permission}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning">
              <h5>Chưa đăng nhập</h5>
              <p>Vui lòng đăng nhập để xem thông tin phân quyền.</p>
            </div>
          )}

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Demo RoleGuard - Chỉ Admin</h5>
                </div>
                <div className="card-body">
                  <RoleGuard requiredRoles={['Admin']}>
                    <div className="alert alert-success">
                      <h6>✅ Bạn có quyền truy cập!</h6>
                      <p>Chỉ Admin mới thấy được nội dung này.</p>
                    </div>
                  </RoleGuard>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Demo RoleGuard - Admin hoặc Manager</h5>
                </div>
                <div className="card-body">
                  <RoleGuard requiredRoles={['Admin', 'Manager']}>
                    <div className="alert alert-info">
                      <h6>✅ Bạn có quyền truy cập!</h6>
                      <p>Admin hoặc Manager có thể thấy nội dung này.</p>
                    </div>
                  </RoleGuard>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Demo Permission - user.create</h5>
                </div>
                <div className="card-body">
                  <RoleGuard requiredPermissions={['user.create']}>
                    <div className="alert alert-success">
                      <h6>✅ Bạn có quyền tạo user!</h6>
                      <p>Chỉ user có permission "user.create" mới thấy được.</p>
                    </div>
                  </RoleGuard>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Demo Permission - product.delete</h5>
                </div>
                <div className="card-body">
                  <RoleGuard requiredPermissions={['product.delete']}>
                    <div className="alert alert-danger">
                      <h6>✅ Bạn có quyền xóa sản phẩm!</h6>
                      <p>Chỉ user có permission "product.delete" mới thấy được.</p>
                    </div>
                  </RoleGuard>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5>Hướng dẫn sử dụng:</h5>
            <div className="card">
              <div className="card-body">
                <h6>1. Đăng nhập với các tài khoản demo:</h6>
                <ul>
                  <li><strong>Admin:</strong> username: admin, password: admin123</li>
                  <li><strong>Manager:</strong> username: manager, password: manager123</li>
                  <li><strong>Staff:</strong> username: staff, password: staff123</li>
                </ul>

                <h6>2. Sử dụng RoleGuard trong components:</h6>
                <pre className="bg-light p-3">
{`import { RoleGuard } from '../Common';

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
</RoleGuard>`}
                </pre>

                <h6>3. Kiểm tra quyền trong code:</h6>
                <pre className="bg-light p-3">
{`import { getUser } from '../utils/auth';
import { hasRole, hasPermission } from '../utils/mockUsers';

const user = getUser();

// Kiểm tra role
if (hasRole(user, 'Admin')) {
  // Logic cho Admin
}

// Kiểm tra permission
if (hasPermission(user, 'user.create')) {
  // Logic cho user có quyền tạo user
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDemo;
