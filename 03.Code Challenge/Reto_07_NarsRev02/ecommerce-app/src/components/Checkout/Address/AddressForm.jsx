import React, { useState } from "react";
import FormField from "../shared/FormField";

const initial = {
  name: "",
  address1: "",
  city: "",
  postalCode: "",
  isDefault: false,
};

export default function AddressForm({ onCancel, onSave }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!form.address1.trim()) e.address1 = "Dirección requerida";
    if (!form.city.trim()) e.city = "Ciudad requerida";
    if (!/^\d{4,10}$/.test(form.postalCode)) e.postalCode = "CP inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const toSave = {
      id: Date.now(),
      name: form.name.trim(),
      address1: form.address1.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
      default: !!form.isDefault,
    };
    onSave?.(toSave);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border p-4 shadow-sm bg-white">
      <FormField
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Ej. Ali Badillo"
        error={errors.name}
        required
      />
      <FormField
        label="Dirección"
        name="address1"
        value={form.address1}
        onChange={handleChange}
        placeholder="Calle #123, Colonia"
        error={errors.address1}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Ciudad"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Aguascalientes"
          error={errors.city}
          required
        />
        <FormField
          label="Código Postal"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          placeholder="20000"
          error={errors.postalCode}
          required
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          id="defaultAddress"
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label htmlFor="defaultAddress" className="text-sm">
          Marcar como predeterminada
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Guardar dirección
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-4 py-2 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}