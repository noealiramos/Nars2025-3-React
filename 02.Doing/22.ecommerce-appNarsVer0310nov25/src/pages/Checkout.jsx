import AddressList from "../components/Checkout/Address/AddressList";

export default function Checkout(){
    return ( <>
    <AddressForm></AddressForm>
    <AddresItem address></AddresItem>
    <AddressList></AddressList>
    </>

    );
}