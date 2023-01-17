import axios from "axios"
import React from "react"
let { REACT_APP_BASE_URL } = process.env
// esto lo debe llamar el carrito de compras
//esto es la logica y el boton de mercado pago que va en el carrito de compras , esto recibe los productos que se envian desde el front
//y este manda la peticion al backend  con estos productos, y el backecnd le devuelve al front la url que es el link de pago y con este link hay que
//redireccionar al usuario a esa url para completar el pago

export  async function MercadoPago (cart)  {

    const pedido = cart.map((item) => {
        return {
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'USD',

        }
    })

    let res = await axios.post(`${REACT_APP_BASE_URL}/mercadopago`, pedido) // pedido debe tener una estructura exacta
    window.location.href = res.data.url   //si me funciona si pongo otro link
    //window.open,abre otro navegador con la url
}
export default MercadoPago;
