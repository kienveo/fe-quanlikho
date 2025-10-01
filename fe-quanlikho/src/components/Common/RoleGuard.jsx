import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../utils/auth';
import { hasRole, hasPermission } from '../../utils/mockUsers';

const RoleGuard = ({ 
  children, 
  requiredRoles = [], 
  requiredPermissions = [],
  fallbackPath = "/dashboard/overview",
  showUnauthorized = true 
}) => {
  const user = getUser();
  
  // Kiểm tra nếu user chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Kiểm tra role nếu có yêu cầu
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(user, role));
    if (!hasRequiredRole) {
      if (showUnauthorized) {
        return (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="alert alert-danger text-center">
                  <h4>Không có quyền truy cập</h4>
                  <p>Bạn không có quyền truy cập vào trang này.</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => window.history.back()}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return <Navigate to={fallbackPath} replace />;
    }
  }
  
  // Kiểm tra permission nếu có yêu cầu
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = requiredPermissions.some(permission => 
      hasPermission(user, permission)
    );
    if (!hasRequiredPermission) {
      if (showUnauthorized) {
        return (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="alert alert-danger text-center">
                  <h4>Không có quyền truy cập</h4>
                  <p>Bạn không có quyền thực hiện hành động này.</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => window.history.back()}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return <Navigate to={fallbackPath} replace />;
    }
  }
  
  return children;
};

export default RoleGuard;
