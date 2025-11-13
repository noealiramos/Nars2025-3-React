import AddressForm from "../components/Checkout/Address/AddressForm";
import AddressItem from "../components/Checkout/Address/AddressItem";
import AddressList from "../components/Checkout/Address/AddressList";
import shippingAddress from "../data/shipping-address.json";

export default function Checkout() {
  return (
    <>
      <AddressForm></AddressForm>
      <AddressItem address={shippingAddress[0]}></AddressItem>
      <AddressList addresses={shippingAddress}></AddressList>
    </>
  );
}
