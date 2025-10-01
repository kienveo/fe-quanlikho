import React from 'react';
import { hasPermission } from '../../utils/mockUsers';
import { getUser } from '../../utils/auth';

const PermissionButton = ({ 
  permission, 
  children, 
  className = "btn btn-primary",
  onClick,
  disabled = false,
  ...props 
}) => {
  const user = getUser();
  
  // Kiểm tra permission
  if (!hasPermission(user, permission)) {
    return null; // Không hiển thị button nếu không có quyền
  }
  
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default PermissionButton;
