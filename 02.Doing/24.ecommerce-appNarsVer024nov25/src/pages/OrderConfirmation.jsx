import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  useEffect(()=>{
    if(!order){
      navigate("/");
      return;
    }
  },[order,navigate]);

  const address = order.shippingAddress || {};
  const subtotal = order.subtotal || 0;
  const tax = order.tax || 0;
  const shipping= order.shipping || 0;
  const total = order.total || 0;

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      {order.date}
    </div>
  );
}
