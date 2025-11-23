import { useEffect, useState } from "react";
import CartView from "../components/Cart/CartView";
import AddressForm from "../components/Checkout/Address/AddressForm";
import AddressList from "../components/Checkout/Address/AddressList";
import SummarySection from "../components/Checkout/shared/SummarySection";
import Button from "../components/common/Button";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loading from "../components/common/Loading/Loading";
import { useCart } from "../context/CartContext";
import {
  getDefaultPaymentMethods,
  getPaymentMethods,
} from "../services/paymentService";
import {
  getDefaultShippingAddress,
  getShippingAddresses,
} from "../services/shippingService";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Control visual del control de direcciones
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressSectionOpen, setAddressSectionOpen] = useState(false);
  const [editingAddres, setEditingAddres] = useState(null);

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

  const handleAddressToggle = () => {
    setShowAddressForm(false);
    setEditingAddres(null);
    setAddressSectionOpen((prev) => !prev);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(false);
    setEditingAddres(null);
    setAddressSectionOpen(false);
  };

  const handleAddressNew = () => {
    setShowAddressForm(true);
    setEditingAddres(null);
    setAddressSectionOpen(true);
  };

  const handleAddressEdit = (address) => {
    setShowAddressForm(true);
    setEditingAddres(address);
    setAddressSectionOpen(true);
  };

  const handleAddressSubmit = (formData) => {
    console.log(formData);
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddres(null);
    setAddressSectionOpen(true);
  };

  const handlePaymentSubmit = (formData) => {
    console.log(formData);
  };



  const handlePaymentEdit = (payment) => {
    console.log(payment);
  };


  
  const handleCreateOrder = () => {};

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
          isExpanded={showAddressForm || addressSectionOpen || !selectedAddress}
          onToggle={handleAddressToggle}
        >
          {!showAddressForm && !editingAddres ? (
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={(address) => handleSelectAddress(address)}
              onEdit={(address) => handleAddressEdit(address)}
              onAdd={handleAddressNew}
              onDelete={handleAddressDelete}
            ></AddressList>
          ) : (
            <AddressForm
              onSubmit={handleAddressSubmit}
              onCancel={handleCancelForm}
              initialValues={editingAddres || {}}
              isEdit={!!editingAddres}
            ></AddressForm>
          )}
        </SummarySection>
        <SummarySection
          title="3. Revisa tu pedido"
          selected={true}
          isExpanded={true}
        >
          <CartView />
        </SummarySection>
      </div>
      <div className="checkout-right">
        <div className="checkout-summary">
          <h3>Resumen de la orden</h3>
          <div className="summary-details">
            <p>
              <strong>Dirección de envío:</strong>
              {selectedAddress?.name}
            </p>
            <p>
              <strong>Método de pago:</strong>
              {selectedPayment?.alias}
            </p>
            <div className="order-costs">
              <p>
                <strong>Subtotal:</strong>$0.00
              </p>
              <p>
                <strong>IVA (16%):</strong>$0.00
              </p>
              <p>
                <strong>Envío:</strong>$0.00
              </p>
              <p>
                <strong>Total:</strong>$0.00
              </p>
              <p>
                <strong>Fecha estimada de entrega:</strong>
                {new Date(
                  Date.now() + 2 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </div>
            <Button
              className="play-button"
              disabled={
                !selectedAddress ||
                !selectedPayment ||
                !cartItems ||
                cartItems.length === 0
              }
              title={
                !cartItems || cartItems.length === 0
                  ? "No hay productos en el carrito"
                  : !selectedAddress
                  ? "Selecciona una dirección de envío"
                  : !selectedPayment
                  ? "Selecciona un método de pago"
                  : "Confirmar y realizar el pago"
              }
              onClick={handleCreateOrder}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
