import { useState } from "react";

export default function AddressFomr(isEdit=false){
    const [formData, setFormData] = useState(
    {
        name: "",
        address1: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        referemce: "",
        default: false,
    });

    const handleSubmit=()=>{};

    const handleChange=(e)=>{
        const {name, value, type, checked}= e.tarjet;
        console.log(e.target);
        setFormData ((prev)=>({
            ...prev,
            [name]:type === "checkbox"? checked: value,
        }));
    };
    
    return (
        <form className="address-form" onSubmit={handleSubmit}>
            <h3>{isEdit = ? "Editar Direccion":"Nueva Dirección"}</h3>
                <Input 
                label="Nombre de la dirección"
                name ="name"
                value={formData.name}
                onChange={handleChange}
                required
                type "text"
                />
                <Input label="Dirección Línea 1:" name="addres1" value ={formData.address1} onChcangetype="text" />
                <Input label="address2" type="text" />
                <Input label="postalCode" type="text" />
                <Input label="city" type="text" />
                <Input label="country" type="text" />
                <Input label="reference" type="text" />
                <label>Guardar como predeterminada: </label>
                <input type="check"></input>
                <Button>Guardar</Button>
              </form>);

};