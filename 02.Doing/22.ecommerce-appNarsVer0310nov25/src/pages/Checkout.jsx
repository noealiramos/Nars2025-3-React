import { useState } from "react";
import Loading from "../components/common/Loading/Loading";
import ErrorMessage "../components/common/ErrorMessage/ErrorMessage";
import AddressForm from "../components/Checkout/Address/AddressForm";
import AddressItem from "../components/Checkout/Address/AddressItem";
import AddressList from "../components/Checkout/Address/AddressList";
import PaymentForm from "../components/Checkout/Payment/PaymentForm";
import PaymentItem from "../components/Checkout/Payment/PaymentItem";
import PaymentList from "../components/Checkout/Payment/PaymentList";
import SummarySection from "../components/Checkout/shared/SummarySection";
import { getPaymentMethods, getDefaultPaymentMethods } from "../services/paymentService";
import { getShippingAddresses, getDefaultShippingAddress } from "../services/shippingService";


export default function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectePayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [addrList, payList, defaultAdd, defaultPay] = await Promise.all([
        getShippingAddresses(),
        getPaymentMethods(),
        getDefaultShippingAddress();
        getDefaultPaymentMethods();
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
      setError("No se pudieron cargar las direcciones o metodos de pago");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  const handleAddressSubmit=(formData)=>{
    console.log(formData);
  };
  const handlePaymentSubmit=(formData)=>{
    console.log(formData);
  };
  const handleAddressEdit=(address)=>{
    console.log(address);
  };
  const handlePaymentEdit=(payment)=>{
    console.log(payment);
  };

  


  return (
    loading ? 
    (<div className="checkout-loading"><Loading><p>cargando direcciones y medtodos de pago</
    p></Loading></div>);
    error ? (<ErrorMessage>{error}</ErrorMessage>
    ) : (
      <div className="checkout-container">
        <div className="checkout-left">
          <summarySection title ="1. direccion de envio" selected={selectedAddress}
          summaryContent={<div className="selected-address">
            <p>{selectedAddress.name}</p>
            <p>{selectedAddress.address1}</p>
            <p>{selectedAddress.city},{selectedAddress.postalCode}

            </p>
            </div>
          }
          isExpanded={false}
          onToggle{()=>{
            console.log(`Expand ${selectedAddress}`);
          }}
      >
        <AddressList addresses = {}
    )
  
  );
}


/*  <>

      <AddressForm></AddressForm>
      <AddressItem address={shippingAddress[0]}></AddressItem>

      <PaymentForm></PaymentForm>
      <PaymentItem payment={paymentMethods[0]}></PaymentItem>
      <PaymentList payments={paymentMethods}></PaymentList>
      <SummarySection title="1. Dirección de envío" selected={false}>
        <AddressList addresses={shippingAddress}></AddressList>
      </SummarySection>
*/

    