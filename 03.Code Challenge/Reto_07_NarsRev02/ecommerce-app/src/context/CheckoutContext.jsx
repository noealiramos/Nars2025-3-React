import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const CheckoutContext = createContext(null);

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within <CheckoutProvider>");
  return ctx;
}

const LS_KEY = "checkout-state-v1";

export function CheckoutProvider({ children, initialAddresses = [], initialPayments = [] }) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [payments, setPayments] = useState(initialPayments);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setAddresses(parsed.addresses || []);
        setPayments(parsed.payments || []);
        setSelectedAddress(parsed.selectedAddress ?? null);
        setSelectedPayment(parsed.selectedPayment ?? null);
      }
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    const data = { addresses, payments, selectedAddress, selectedPayment };
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }, [addresses, payments, selectedAddress, selectedPayment]);

  const addAddress = useCallback((addr) => {
    setAddresses((prev) => {
      const next = addr.default
        ? prev.map(a => ({ ...a, default: false }))
        : prev;
      return [...next, addr];
    });
    if (addr.default) setSelectedAddress(addr.id);
  }, []);

  const addPayment = useCallback((pmt) => {
    setPayments((prev) => {
      const next = pmt.default
        ? prev.map(p => ({ ...p, default: false }))
        : prev;
      return [...next, pmt];
    });
    if (pmt.default) setSelectedPayment(pmt.id);
  }, []);

  const value = useMemo(() => ({
    addresses, payments, selectedAddress, selectedPayment,
    setSelectedAddress, setSelectedPayment, addAddress, addPayment,
  }), [addresses, payments, selectedAddress, selectedPayment, addAddress, addPayment]);

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}