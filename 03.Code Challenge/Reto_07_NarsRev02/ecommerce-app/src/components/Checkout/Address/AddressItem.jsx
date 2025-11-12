import Button from "../../common/Button";

export default function AddressItem({ address, isDefault, onSelect, onEdit }) {
  return (
    <div className={`address-item ${isDefault ? "default" : ""}`}>
      <div className="address-content">
        <h4>{address.name}</h4>
        <p>{address.address1}</p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.postalCode}
        </p>
        <p>{address.reference}</p>
        {isDefault && <span className="default-badge">Predeterminada</span>}
      </div>
      <div className="address-actions">
        <Button onClick={() => onSelect(address)}>
          {isDefault ? "Seleccionada" : "Seleccionar"}
        </Button>
        <Button variant="secondary" onClick={() => onEdit(address)}>
          Editar
        </Button>
      </div>
    </div>
  );
}
