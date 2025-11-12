import React, { useState } from "react";
import FormField from "../shared/FormField";

const initial = {
  cardholder: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  isDefault: false,
};

const isValidCard = (n) => /^\d{13,19}$/.test(n.replace(/\s+/g, ""));
const isValidExpiry = (mmYY) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(mmYY);
const isValidCVV = (cvv) => /^\d{3,4}$/.test(cvv);

export default function PaymentForm({ onCancel, onSave }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.cardholder.trim()) e.cardholder = "Titular requerido";
    if (!isValidCard(form.cardNumber)) e.cardNumber = "Número inválido";
    if (!isValidExpiry(form.expiry)) e.expiry = "Formato MM/AA";
    if (!isValidCVV(form.cvv)) e.cvv = "CVV inválido";
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
    const safeMasked = mask(form.cardNumber);
    const toSave = {
      id: Date.now(),
      brand: detectBrand(form.cardNumber),
      masked: safeMasked,
      last4: safeMasked.slice(-4),
      default: !!form.isDefault,
    };
    onSave?.(toSave);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border p-4 shadow-sm bg-white">
      <FormField
        label="Titular"
        name="cardholder"
        value={form.cardholder}
        onChange={handleChange}
        placeholder="Ej. Ali Badillo"
        error={errors.cardholder}
        required
        autoComplete="cc-name"
      />
      <FormField
        label="Número de tarjeta"
        name="cardNumber"
        value={form.cardNumber}
        onChange={handleChange}
        placeholder="4111 1111 1111 1111"
        error={errors.cardNumber}
        required
        autoComplete="cc-number"
        inputMode="numeric"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Expira (MM/AA)"
          name="expiry"
          value={form.expiry}
          onChange={handleChange}
          placeholder="12/28"
          error={errors.expiry}
          required
          autoComplete="cc-exp"
        />
        <FormField
          label="CVV"
          name="cvv"
          value={form.cvv}
          onChange={handleChange}
          placeholder="123"
          error={errors.cvv}
          required
          autoComplete="cc-csc"
          inputMode="numeric"
        />
        <div className="flex items-center gap-2 mt-6">
          <input
            id="defaultPayment"
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="defaultPayment" className="text-sm">
            Guardar como predeterminado
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Guardar método de pago
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

// Helpers (simple, offline)
function mask(num) {
  const digits = num.replace(/\s+/g, "");
  return digits.replace(/\d(?=\d{4})/g, "•");
}

function detectBrand(num) {
  const n = num.replace(/\s+/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "American Express";
  if (/^6(?:011|5)/.test(n)) return "Discover";
  return "Card";
}