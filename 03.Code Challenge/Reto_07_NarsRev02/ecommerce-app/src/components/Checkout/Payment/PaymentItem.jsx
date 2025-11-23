import Button from "../../common/Button";
import "./PaymentItem.css";

const PaymentItem = ({ payment, isDefault, onSelect, onEdit }) => {
  const maskCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  };

  return (
    <div className={`payment-item ${isDefault ? "default" : ""}`}>
      <div className="payment-content">
        <h4>{payment.alias}</h4>
        <p>{maskCardNumber(payment.cardNumber)}</p>
        <p>Vence: {payment.expireDate}</p>
        <p>Titular: {payment.placeHolder}</p>
        {isDefault && <span className="default-badge">Predeterminada</span>}
      </div>
      <div className="payment-actions">
        <Button onClick={() => onSelect(payment)}>
          {isDefault ? "Seleccionada" : "Seleccionar"}
        </Button>
        <Button variant="secondary" onClick={() => onEdit(payment)}>
          Editar
        </Button>
      </div>
    </div>
  );
};

export default PaymentItem;
