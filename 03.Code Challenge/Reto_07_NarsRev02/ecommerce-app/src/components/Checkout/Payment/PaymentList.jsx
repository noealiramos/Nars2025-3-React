import Button from "../../common/Button";
import PaymentItem from "./PaymentItem";
import "./PaymentList.css";

const PaymentList = ({
  payments,
  selectedPayment,
  onSelect,
  onEdit,
  onAdd,
}) => {
  return (
    <div className="payment-list">
      <div className="payment-list-header">
        <h3>Métodos de Pago</h3>
        <Button onClick={onAdd}>Agregar Nueva Tarjeta</Button>
      </div>
      <div className="payment-list-content">
        {payments.map((payment) => (
          <PaymentItem
            key={payment.id || payment.alias}
            payment={payment}
            isDefault={selectedPayment?.alias === payment.alias}
            onSelect={onSelect}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentList;
