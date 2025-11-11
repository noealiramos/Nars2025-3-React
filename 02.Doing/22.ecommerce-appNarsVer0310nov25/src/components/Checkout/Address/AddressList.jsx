import Button

export default function AddressList({
    addresses,
    selectedAddress,
    onSelect,
    onEdit,
    onAdd
}) {

    return(<div className="address-list">
        <div clasName="address-list-header">
            <h3>direcciones de envio</h3>
            <Button onClick={onAdd}>agregar nueva direccion</Button>
        </div>
        <div className="address-list-content">
            {addresses.map((address)=> {
                <AddressItem key={address.id || address.name}
                address={address} isDefault={selectedAddress?.name=== address.name } onSelect={onSelect} onEdit={onEdit}
                ></AddressItem>;
            })}
        </div>
    </div>
    );
}