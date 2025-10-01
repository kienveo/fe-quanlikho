import React from 'react';
import { getUser } from '../../utils/auth';
import { hasPermission } from '../../utils/mockUsers';

const PermissionDebug = () => {
  const user = getUser();

  const allPermissions = [
    'user.create', 'user.read', 'user.update', 'user.delete',
    'product.create', 'product.read', 'product.update', 'product.delete',
    'order.create', 'order.read', 'order.update', 'order.delete',
    'category.create', 'category.read', 'category.update', 'category.delete',
    'report.read', 'dashboard.read'
  ];

  const menuPermissions = [
    { permission: 'dashboard.read', label: 'Tổng quan' },
    { permission: 'product.read', label: 'Sản phẩm' },
    { permission: 'category.read', label: 'Danh mục' },
    { permission: 'order.read', label: 'Đơn hàng' },
    { permission: 'user.read', label: 'Người dùng' },
    { permission: 'report.read', label: 'Báo cáo' }
  ];

  if (!user) {
    return (
      <div className="alert alert-warning">
        <h5>Chưa đăng nhập</h5>
        <p>Vui lòng đăng nhập để xem thông tin phân quyền.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>Debug Phân quyền</h2>
          
          <div className="card mb-4">
            <div className="card-header">
              <h5>Thông tin User</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Tên:</strong> {user.name}</p>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> <span className="badge bg-primary">{user.role}</span></p>
                </div>
                <div className="col-md-6">
                  <h6>Permissions hiện tại:</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {user.permissions?.map((permission, index) => (
                      <span key={index} className="badge bg-success">{permission}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5>Menu Permissions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {menuPermissions.map((item, index) => (
                  <div key={index} className="col-md-4 mb-2">
                    <div className={`p-2 rounded ${hasPermission(user, item.permission) ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                      <strong>{item.label}</strong>
                      <br />
                      <small>{item.permission}</small>
                      <br />
                      <span className="badge bg-light text-dark">
                        {hasPermission(user, item.permission) ? 'Có quyền' : 'Không có quyền'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5>Tất cả Permissions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {allPermissions.map((permission, index) => (
                  <div key={index} className="col-md-3 mb-1">
                    <span className={`badge ${hasPermission(user, permission) ? 'bg-success' : 'bg-secondary'}`}>
                      {permission}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionDebug;
