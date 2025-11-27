import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartView from "../components/Cart/CartView";
import AddressForm from "../components/Checkout/Address/AddressForm";
import AddressList from "../components/Checkout/Address/AddressList";
import PaymentForm from "../components/Checkout/Payment/PaymentForm";
import PaymentList from "../components/Checkout/Payment/PaymentList";
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
  const navigate = useNavigate();
  // Contexto global del carrito
  const { cartItems, total, clearCart } = useCart();

  // Estados para direcciones y métodos de pago
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);

  // Estados para control de componentes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para mantener el valor de las dirección o método de pago seleccionado
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Control visual del componente de direcciones
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressSectionOpen, setAddressSectionOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Control visual del componente de métodos de pago
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSectionOpen, setPaymentSectionOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

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
    setEditingAddress(null);
    setAddressSectionOpen((prev) => !prev);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressSectionOpen(false);
  };

  const handleAddressNew = () => {
    setShowAddressForm(true);
    setEditingAddress(null);
    setAddressSectionOpen(true);
  };

  const handleAddressEdit = (address) => {
    setShowAddressForm(true);
    setEditingAddress(address);
    setAddressSectionOpen(true);
  };

  const handleAddressDelete = (address) => {
    let updatedAddressess = addresses.filter((add) => add._id !== address._id);

    if (selectedAddress._id === address._id && updatedAddressess.length > 0) {
      selectedAddress(updatedAddressess[0]);
    } else {
      selectedAddress(null);
    }
    setAddresses(updatedAddressess);
  };

  const handleAddressSubmit = (formData) => {
    console.log(formData);
    let item = null;
    let updatedItems = [];
    if (editingAddress) {
      item = { ...formData };
      updatedItems = addresses.map((address) => {
        if (address._id === item._id) {
          address = item;
        }
      });
    } else {
      item = { _id: new Date(), ...formData };
      updatedItems = [...addresses, item];
    }
    setAddresses(updatedItems);
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressSectionOpen(true);
  };

  const handlePaymentToggle = () => {
    setShowPaymentForm(false);
    setEditingPayment(null);
    setPaymentSectionOpen((prev) => !prev);
  };

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentForm(false);
    setEditingPayment(null);
    setPaymentSectionOpen(false);
  };

  const handlePaymentNew = () => {
    setShowPaymentForm(true);
    setEditingPayment(null);
    setPaymentSectionOpen(true);
  };

  const handlePaymentEdit = (payment) => {
    setShowPaymentForm(true);
    setEditingPayment(payment);
    setPaymentSectionOpen(true);
  };

  const handlePaymentDelete = (payment) => {
    let updatedPayments = payments.filter((add) => add._id !== payment._id);

    if (selectedPayment._id === payment._id && updatedPayments.length > 0) {
      selectedPayment(updatedPayments[0]);
    } else {
      selectedPayment(null);
    }
    setPayments(updatedPayments);
  };

  const handlePaymentSubmit = (formData) => {
    console.log(formData);
  };

const formatMoney = (value)=>
  new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN"}).format 
  (value); 

const subtotal = typeof total === "number"? total:0;
const TAX_RATE=0.16;
const SHIPPING_RATE= 350;
const FREE_SHIPPING_THRESHOLD=1000;

const taxAmount = parseFloat((subtotal*TAX_RATE).toFixed(2));
const shippingCost = subtotal>= FREE_SHIPPING_THRESHOLD?0:SHIPPING_RATE;
const grantotal = parseFloat((subtotal+taxAmount+shippingCost).toFixed(2));

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
          {!showAddressForm && !editingAddress ? (
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={(address) => handleSelectAddress(address)}
              onEdit={(address) => handleAddressEdit(address)}
              onAdd={handleAddressNew}
              onDelete={(address) => handleAddressDelete(address)}
            ></AddressList>
          ) : (
            <AddressForm
              onSubmit={handleAddressSubmit}
              onCancel={handleCancelForm}
              initialValues={editingAddress || {}}
              isEdit={!!editingAddress}
            ></AddressForm>
          )}
        </SummarySection>

        <SummarySection
          title="2. Método de pago"
          selected={selectedPayment}
          summaryContent={
            <div className="selected-payment">
              <p>{selectedPayment?.alias}</p>
              <p>{selectedPayment?.cardNumber?.slice(-4) || "----"}</p>
            </div>
          }
          onToggle={handlePaymentToggle}
          isExpanded={showPaymentForm || paymentSectionOpen || !selectedPayment}
        >
          {!showPaymentForm && !editingPayment}?(
          <PaymentList
            payments={payments}
            selectedPayment={selectedPayment}
            onSelect={(payment) => handleSelectPayment(payment)}
            onDelete={(payment) => handlePaymentDelete(payment)}
            onAdd={handlePaymentNew}
            onEdit={(payment) => handlePaymentEdit(payment)}
          ></PaymentList>
          ):(
          <PaymentForm
            onSubmit={handlePaymentSubmit}
            onCancel={handleCancelForm}
            initialValues={editingPayment || {}}
            isEdit={!!editingPayment}
          ></PaymentForm>
          )
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
                <strong>Subtotal:</strong>{formatMoney(subtotal)}
              </p>
              <p>
                <strong>IVA (16%):</strong>{formatMoney(taxAmount)}
              </p>
              <p>
                <strong>Envío:</strong>{formatMoney(shippingCost)}
              </p>
              <p>
                <strong>Total:</strong>{formatMoney(grantotal)}
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
