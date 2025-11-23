import { useEffect, useState } from "react";
import AddressForm from "../components/Checkout/Address/AddressForm";
import AddressList from "../components/Checkout/Address/AddressList";
import SummarySection from "../components/Checkout/shared/SummarySection";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loading from "../components/common/Loading/Loading";
import {
  getDefaultPaymentMethods,
  getPaymentMethods,
} from "../services/paymentService";
import {
  getDefaultShippingAddress,
  getShippingAddresses,
} from "../services/shippingService";

export default function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [addrList, payList, defaultAdd, defaultPay] = await Promise.all([
        getShippingAddresses(),
        getPaymentMethods(),
        getDefaultShippingAddress(),
        getDefaultPaymentMethods(),
      ]);

      setAddresses(addrList || []);

      const normalizedPayments = (payList || []).map((p) => ({
        id: p._id || Date.now().toString(),
        alias: p.alias || `Tarjeta ****${(p.cardNumber || "").slice(-4)}`,
        cardNumber: p.cardNumber || "",
        placeHolder: p.placeHolder || "",
        expiryDate: p.expiryDate || "",
        isDefault: p.isDefault || false,
      }));
      setPayments(payList || []);
      setSelectedAddress(defaultAdd);
      setSelectedPayment(defaultPay);
    } catch (err) {
      setError("No se pudieron cargar las direcciones o métodos de pago");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddressSubmit = (formData) => {
    console.log(formData);
  };
  const handlePaymentSubmit = (formData) => {
    console.log(formData);
  };
  const handleAddressEdit = (address) => {
    console.log(address);
  };
  const handlePaymentEdit = (payment) => {
    console.log(payment);
  };

  return loading ? (
    <div className="checkout-loading">
      <Loading>
        <p>Cargando direcciones y métodos de pago</p>
      </Loading>
    </div>
  ) : error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <div className="checkout-container">
      <div className="checkout-left">
        <SummarySection
          title="1. Dirección de envío"
          selected={selectedAddress}
          summaryContent={
            <div className="selected-address">
              <p>{selectedAddress?.name}</p>
              <p>{selectedAddress?.address1}</p>
              <p>
                {selectedAddress?.city}, {selectedAddress?.postalCode}
              </p>
            </div>
          }
          isExpanded={false}
          onToggle={() => {
            console.log(`Expand ${selectedAddress}`);
          }}
        >
          <AddressList
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelect={(address) => {
              setSelectedAddress(address);
            }}
            onEdit={handleAddressEdit}
            onAdd={() => console.log("Add address")}
          ></AddressList>
          <AddressForm
            onSubmit={handleAddressSubmit}
            initialValues={null}
            isEdit={false}
          ></AddressForm>
        </SummarySection>
      </div>
      <div className="checkout-right"></div>
    </div>
  );
}
