// src/pages/Checkout.jsx
import React from "react";
import { CheckoutProvider, useCheckout } from "../context/CheckoutContext";
import AddressForm from "../components/Checkout/Address/AddressForm";
import PaymentForm from "../components/Checkout/Payment/PaymentForm";
import SectionTitle from "../components/Checkout/shared/SectionTitle";

function CheckoutInner() {
  const {
    addresses, payments,
    selectedAddress, selectedPayment,
    setSelectedAddress, setSelectedPayment,
    addAddress, addPayment
  } = useCheckout();

  const [showAddrForm, setShowAddrForm] = React.useState(false);
  const [showPayForm, setShowPayForm] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <section>
        <SectionTitle
          title="Direcciones"
          right={
            <button
              className="rounded-xl border px-3 py-2"
              onClick={() => setShowAddrForm(v => !v)}
            >
              {showAddrForm ? "Cerrar" : "Agregar dirección"}
            </button>
          }
        />
        {!showAddrForm ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {addresses.map(a => (
              <li key={a.id}>
                <button
                  onClick={() => setSelectedAddress(a.id)}
                  className={`w-full text-left rounded-xl border p-3 hover:bg-gray-50 ${selectedAddress === a.id ? "ring-2 ring-indigo-500" : ""}`}
                >
                  <div className="font-medium">
                    {a.name} {a.default && <span className="ml-2 text-xs text-indigo-600">Predeterminada</span>}
                  </div>
                  <div className="text-sm text-gray-600">{a.address1}</div>
                  <div className="text-sm text-gray-600">{a.city}, {a.postalCode}</div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <AddressForm
            onCancel={() => setShowAddrForm(false)}
            onSave={(addr) => { addAddress(addr); setShowAddrForm(false); }}
          />
        )}
      </section>

      <section>
        <SectionTitle
          title="Métodos de pago"
          right={
            <button
              className="rounded-xl border px-3 py-2"
              onClick={() => setShowPayForm(v => !v)}
            >
              {showPayForm ? "Cerrar" : "Agregar método"}
            </button>
          }
        />
        {!showPayForm ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {payments.map(p => (
              <li key={p.id}>
                <button
                  onClick={() => setSelectedPayment(p.id)}
                  className={`w-full text-left rounded-xl border p-3 hover:bg-gray-50 ${selectedPayment === p.id ? "ring-2 ring-indigo-500" : ""}`}
                >
                  <div className="font-medium">
                    {p.brand} •••• {p.last4} {p.default && <span className="ml-2 text-xs text-indigo-600">Predeterminada</span>}
                  </div>
                  <div className="text-sm text-gray-600">{p.masked}</div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <PaymentForm
            onCancel={() => setShowPayForm(false)}
            onSave={(pmt) => { addPayment(pmt); setShowPayForm(false); }}
          />
        )}
      </section>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutInner />
    </CheckoutProvider>
  );
}
