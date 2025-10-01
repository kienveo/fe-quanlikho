import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { showToast } from "../Common/Toast";
import { findUserByCredentials } from "../../utils/mockUsers";
import { setToken, setUser } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Email or Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Sử dụng mock data thay vì API call
      const user = findUserByCredentials(formData.username, formData.password);
      
      if (user) {
        // Login successful
        showToast("Đăng nhập thành công!", {
          type: "success",
        });
        
        // Tạo mock token
        const mockToken = `mock_token_${user.id}_${Date.now()}`;
        const expiredAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        
        // Save token and user data using auth utils
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
        
        // Redirect based on role
        if (user.role === "Admin") {
          navigate("/dashboard/overview", { replace: true });
        } else if (user.role === "Manager") {
          navigate("/dashboard/overview", { replace: true });
        } else {
          navigate("/dashboard/overview", { replace: true });
        }
      } else {
        // Invalid credentials
        setErrors({ general: "Tên đăng nhập hoặc mật khẩu không đúng." });
        showToast("Tên đăng nhập hoặc mật khẩu không đúng!", { type: "error" });
      }
    } catch (error) {
      setErrors({ general: "Có lỗi xảy ra khi đăng nhập." });
      showToast("Có lỗi xảy ra khi đăng nhập!", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark mb-2">Xin chào</h2>
        <p className="text-muted">Chào mừng bạn đến với hệ thống quản lý kho</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}

        <Input
          type="text"
          name="username"
          placeholder="Email hoặc tên đăng nhập"
          value={formData.username}
          onChange={handleChange}
          icon="bi bi-envelope"
          error={errors.username}
        />

        <Input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          icon="bi bi-lock"
          error={errors.password}
        />

        <div className="d-grid mb-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="py-3 fw-semibold"
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </div>

        <div className="text-center mb-3">
          <Link
            to="/forgot-password"
            className="text-decoration-none text-muted"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <div className="text-center">
          <span className="text-muted">Chưa có tài khoản? </span>
          <Link
            to="/register"
            className="text-primary text-decoration-none fw-semibold"
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
