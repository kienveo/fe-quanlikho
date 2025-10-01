import React from 'react';
import { getUser } from '../../utils/auth';
import { hasPermission } from '../../utils/mockUsers';
import { PermissionButton, RoleGuard } from '../Common';

const UserManagementDemo = () => {
  const user = getUser();

  const handleCreateUser = () => {
    alert('Tạo user mới (chỉ Admin có quyền này)');
  };

  const handleEditUser = () => {
    alert('Sửa thông tin user (Admin và Manager có quyền này)');
  };

  const handleDeleteUser = () => {
    alert('Xóa user (không ai có quyền này nữa)');
  };

  const handleViewUser = () => {
    alert('Xem thông tin user (tất cả đều có quyền này)');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>Demo Quản lý User</h2>
          <p className="text-muted">Demo các quyền khác nhau trong quản lý user</p>
          
          {user ? (
            <div className="card">
              <div className="card-header">
                <h5>User hiện tại: {user.name} ({user.role})</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Quyền User:</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className={`badge ${hasPermission(user, 'user.create') ? 'bg-success' : 'bg-secondary'}`}>
                        Tạo user
                      </span>
                      <span className={`badge ${hasPermission(user, 'user.read') ? 'bg-success' : 'bg-secondary'}`}>
                        Xem user
                      </span>
                      <span className={`badge ${hasPermission(user, 'user.update') ? 'bg-success' : 'bg-secondary'}`}>
                        Sửa user
                      </span>
                      <span className={`badge ${hasPermission(user, 'user.delete') ? 'bg-success' : 'bg-secondary'}`}>
                        Xóa user
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Actions:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      <PermissionButton 
                        permission="user.create"
                        onClick={handleCreateUser}
                        className="btn btn-success btn-sm"
                      >
                        Tạo User
                      </PermissionButton>
                      
                      <PermissionButton 
                        permission="user.read"
                        onClick={handleViewUser}
                        className="btn btn-info btn-sm"
                      >
                        Xem User
                      </PermissionButton>
                      
                      <PermissionButton 
                        permission="user.update"
                        onClick={handleEditUser}
                        className="btn btn-warning btn-sm"
                      >
                        Sửa User
                      </PermissionButton>
                      
                      <PermissionButton 
                        permission="user.delete"
                        onClick={handleDeleteUser}
                        className="btn btn-danger btn-sm"
                      >
                        Xóa User
                      </PermissionButton>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <h6>Demo RoleGuard:</h6>
                    <RoleGuard requiredPermissions={['user.create']}>
                      <div className="alert alert-success">
                        <h6>✅ Bạn có quyền tạo user!</h6>
                        <p>Chỉ Admin mới thấy được nội dung này.</p>
                      </div>
                    </RoleGuard>
                  </div>
                  
                  <div className="col-md-6">
                    <h6>Demo RoleGuard - Xóa user:</h6>
                    <RoleGuard requiredPermissions={['user.delete']}>
                      <div className="alert alert-danger">
                        <h6>✅ Bạn có quyền xóa user!</h6>
                        <p>Không ai có quyền này nữa.</p>
                      </RoleGuard>
                      <div className="alert alert-info">
                        <h6>ℹ️ Không có quyền xóa user</h6>
                        <p>Admin và Manager đều không có quyền xóa user.</p>
                      </div>
                    </RoleGuard>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning">
              <h5>Chưa đăng nhập</h5>
              <p>Vui lòng đăng nhập để xem demo phân quyền.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementDemo;
