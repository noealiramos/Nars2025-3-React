import { useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import "./AddressForm.css";

export default function AddressForm({
  onSubmit,
  initialValues = {},
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "",
    reference: "",
    default: false,
    ...initialValues,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? "Editar Dirección" : "Nueva Dirección"}</h3>

      <Input
        label="Nombre de la dirección"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Dirección Línea 1"
        name="address1"
        value={formData.address1}
        onChange={handleChange}
        required
      />

      <Input
        label="Dirección Línea 2"
        name="address2"
        value={formData.address2}
        onChange={handleChange}
      />

      <Input
        label="Código Postal"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />

      <Input
        label="Ciudad"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <Input
        label="País"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
      />

      <Input
        label="Referencia"
        name="reference"
        value={formData.reference}
        onChange={handleChange}
      />

      <div className="form-checkbox">
        <input
          type="checkbox"
          name="default"
          checked={formData.default}
          onChange={handleChange}
          id="defaultAddress"
        />
        <label htmlFor="defaultAddress">
          Establecer como dirección predeterminada
        </label>
      </div>

      <div className="form-actions">
        <Button type="submit">
          {isEdit ? "Guardar Cambios" : "Agregar Dirección"}
        </Button>
      </div>
    </form>
  );
}
