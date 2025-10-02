import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Button from "../../Common/Button";

const ViewOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const order = {
    id: parseInt(id),
    orderNumber: "ORD001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@email.com",
    customerPhone: "0123456789",
    totalAmount: 25000000,
    status: "completed",
    orderDate: "2024-01-15",
    items: [
      {
        id: 1,
        name: "Laptop Dell XPS 13",
        price: 25000000,
        quantity: 1,
        total: 25000000
      }
    ],
    notes: "Giao hàng trong giờ hành chính"
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-warning", text: "Chờ xác nhận" },
      processing: { class: "bg-info", text: "Đang xử lý" },
      completed: { class: "bg-success", text: "Hoàn thành" },
      cancelled: { class: "bg-danger", text: "Đã hủy" }
    };
    const config = statusConfig[status] || { class: "bg-secondary", text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const handleEdit = () => {
    // TODO: Navigate to edit page
    console.log("Edit order:", order.id);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      // TODO: API call to delete order
      console.log("Delete order:", order.id);
      alert("Đơn hàng đã được xóa thành công!");
      navigate("/dashboard/orders");
    }
  };

  const handleBack = () => {
    navigate("/dashboard/orders");
  };

  const handleStatusChange = (newStatus) => {
    if (window.confirm(`Bạn có chắc chắn muốn thay đổi trạng thái thành "${newStatus}"?`)) {
      // TODO: API call to update status
      console.log("Update order status:", order.id, newStatus);
      alert("Trạng thái đã được cập nhật thành công!");
    }
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Chi tiết đơn hàng</h2>
            <div className="d-flex gap-2">
              <Button
                variant="outline-warning"
                onClick={handleEdit}
              >
                <i className="bi bi-pencil me-2"></i>
                Chỉnh sửa
              </Button>
              <Button
                variant="outline-danger"
                onClick={handleDelete}
              >
                <i className="bi bi-trash me-2"></i>
                Xóa
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleBack}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông tin đơn hàng</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Mã đơn hàng</label>
                  <div className="form-control-plaintext">{order.orderNumber}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Khách hàng</label>
                  <div className="form-control-plaintext">{order.customerName}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="form-control-plaintext">{order.customerEmail}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Số điện thoại</label>
                  <div className="form-control-plaintext">{order.customerPhone}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tổng tiền</label>
                  <div className="form-control-plaintext">{order.totalAmount?.toLocaleString('vi-VN')} VNĐ</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Trạng thái</label>
                  <div className="form-control-plaintext">
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="mt-2">
                    <Button variant="outline-info" size="sm" onClick={() => handleStatusChange("completed")}>Hoàn thành</Button>{' '}
                    <Button variant="outline-danger" size="sm" onClick={() => handleStatusChange("cancelled")}>Hủy</Button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Ngày đặt</label>
                  <div className="form-control-plaintext">{order.orderDate}</div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Ghi chú</label>
                  <div className="form-control-plaintext">{order.notes}</div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Sản phẩm</label>
                  <ul className="list-group">
                    {order.items && order.items.map(item => (
                      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.name} <span className="badge bg-primary">x{item.quantity}</span>
                        <span>{item.price?.toLocaleString('vi-VN')} VNĐ</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewOrder;
