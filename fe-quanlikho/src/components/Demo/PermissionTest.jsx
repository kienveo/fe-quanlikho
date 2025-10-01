import React, { useState } from 'react';
import { findUserByCredentials } from '../../utils/mockUsers';
import { setToken, setUser } from '../../utils/auth';
import PermissionDebug from '../Debug/PermissionDebug';

const PermissionTest = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const testUsers = [
    { username: 'admin', password: 'admin123', label: 'Admin (Toàn quyền)' },
    { username: 'manager', password: 'manager123', label: 'Manager (Quản lý)' },
    { username: 'staff', password: 'staff123', label: 'Staff (Nhân viên)' }
  ];

  const handleLogin = (username, password) => {
    const user = findUserByCredentials(username, password);
    if (user) {
      // Tạo mock token
      const mockToken = `mock_token_${user.id}_${Date.now()}`;
      const expiredAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
      
      // Save token and user data
      setToken(mockToken);
      localStorage.setItem("tokenExpiredAt", expiredAt.toString());
      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions
      });
      
      setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('tokenExpiredAt');
    setCurrentUser(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>Test Phân quyền</h2>
          
          <div className="card mb-4">
            <div className="card-header">
              <h5>Đăng nhập Test</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {testUsers.map((testUser, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body text-center">
                        <h6>{testUser.label}</h6>
                        <p className="text-muted small">
                          {testUser.username} / {testUser.password}
                        </p>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleLogin(testUser.username, testUser.password)}
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {currentUser && (
                <div className="mt-3">
                  <div className="alert alert-success">
                    <h6>Đã đăng nhập: {currentUser.name} ({currentUser.role})</h6>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {currentUser && <PermissionDebug />}
        </div>
      </div>
    </div>
  );
};

export default PermissionTest;
