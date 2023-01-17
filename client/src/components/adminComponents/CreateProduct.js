import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts, postProduct, productUpdated } from '../../redux/actions/actions/products';

export default function CreateProduct({ handleClose, data }) {

    const dispatch = useDispatch()

    const [create, setCreate] = useState({
        name: data.name || "",
        name: data.description || "",
        image: data.image || "",
        price: data.price || 0,
        stock: data.stock || 0,
        available: data.available || true,
    })

    const handleChange = (e) => {
        const property = e.target.name
        const value = e.target.value

        setCreate({
            ...create,
            [property]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.id) {
            dispatch(productUpdated({ ...create, id: data.id }))
            alert('Products updated!')
        } else {
            dispatch(postProduct(create))
            alert('New product created!')
        }

        setCreate({
            name: "",
            price: 0,
            stock: 0,
        })
        dispatch(getProducts());
        handleClose()
    }


    return (
        <div>
            <div className="mx-auto rounded mt-5 mb-5">
                <div className='px-5 mx-auto'>
                    <h4 className='mt-3 mb-3'>{data.id ? 'Update product' : 'Create new product'}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div class="col-lg-6">
                                <label className="labels">Name</label>
                                <input type="text" name='name' value={create.name}
                                    required onChange={handleChange} className="form-control" />
                            </div>
                            <div class="col-lg-6">
                                <label className="labels">Description</label>
                                <textarea type="text" name='description' value={create.description}
                                    required onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-12'>
                                <label className='labels'>Image URL</label>
                                <input  type="text" name='image' value={create.image}
                                    required onChange={handleChange} class="form-control" rows="3"></input>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div class="col-lg-4">
                                <label class="labels">Price</label>
                                <input type="number" name='price' value={create.price}
                                    required onChange={handleChange} className="form-control" />
                            </div>
                            <div className='col-4'>
                                <label className='labels'>Stock</label>
                                <input type="number" name='stock' value={create.stock}
                                    required onChange={handleChange} className="form-control" rows="3" />
                            </div>
                            <div className='col-4'>
                                {
                                    data.id && (
                                        <div>
                                            <label className='labels'>Available</label>
                                            <select name="available" onChange={handleChange} value={create.available} class="form-select"
                                                aria-label="Default select example">
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <button className="btn border mt-3 btn-primary d-flex justify-content-center"
                            type="submit">{data.id ? 'Update' : 'Create'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}