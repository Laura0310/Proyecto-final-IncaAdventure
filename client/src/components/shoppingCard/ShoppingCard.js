import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { changeQuantity, deleteFromCart } from '../../redux/actions/actions/stores';

export const ShoppingCard = ({service, index}) => {

    const [quantity, setQuantity]= useState(service.quantity)
    const dispatch = useDispatch()

    function handleDelete() {
        dispatch(deleteFromCart(service))
    }

    function handleChange(e) {
        setQuantity(e.target.value)
        dispatch(changeQuantity({index, quantity: Number(e.target.value)}))
    }
    return (
        <tr>
            <td data-th="Product">
                <div className="row">
                    <div className="col-md-3 text-left">
                        <img src="https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow " />
                    </div>
                    <div className="col-md-9 text-left mt-sm-2">
                        <h4>{service.name}</h4>
                        <p className="font-weight-light">{service.category}</p>
                    </div>
                </div>
            </td>
            <td data-th="Price">${service.price}</td>
            <td data-th="Quantity">
                <input type="number" min={1} className="form-control form-control-lg text-center" onChange={handleChange} value={quantity} />
            </td>
            <td className="actions" data-th="">
                <div className="text-right">
                    <button className="btn btn-white bg-white btn-md mb-2" onClick={handleDelete}>
                        <DeleteRoundedIcon />
                    </button>
                </div>
            </td>
        </tr>
    )
}
