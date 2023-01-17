import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { activityUpdated, getActivities, postActivities } from '../../redux/actions/actions/activities';

export default function CreateActivities({ handleClose, data }) {

    const dispatch = useDispatch()

    const [create, setCreate] = useState({
        name: data.name || "",
        schedule: data.schedule || "",
        price: data.price || 0,
        start_at: data.start_at || "",
        end_at: data.end_at || "",
        description: data.description || "",
        image : data.image || "",
        allowed_age: data.allowed_age || "",
        difficulty_level: data.difficulty_level || "",
        type: data.type || "",
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
            dispatch(activityUpdated({ ...create, id: data.id }))
            alert('Activity updated!')
        } else {
            dispatch(postActivities(create))
            alert('New activity created!')
        }

        setCreate({
            name: "",
            schedule: "",
            price: 0,
            start_at: "",
            end_at: "",
            description: "",
            allowed_age: "",
            difficulty_level: "",
            type: "",
        })
        dispatch(getActivities());
        handleClose()
    }


    return (
        <div>
            <div className="mx-auto rounded mt-5 mb-5">
                <div className='px-5 mx-auto'>
                    <h4 className='mt-3 mb-3'>{data.id ? 'Update activity' : 'Create new activity'}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div class="col-lg-6">
                                <label className="labels">Name</label>
                                <input type="text" name='name' value={create.name}
                                    required onChange={handleChange} className="form-control" />
                            </div>

                            <div class="col-lg-6">
                                <label class="labels">Price</label>
                                <input type="number" name='price' value={create.price}
                                    required onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-12'>
                                <label className='labels'>Description</label>
                                <textarea name='description' value={create.description}
                                    required onChange={handleChange} class="form-control" rows="3"></textarea>
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
                            <div className='col-4'>
                                <label className='labels'>Schedule</label>
                                <textarea name='schedule' value={create.schedule}
                                    required onChange={handleChange} class="form-control" rows="3"></textarea>
                            </div>
                            <div className='col-3'>
                                <label class="labels">Allowed age</label>
                                <select name="allowed_age" onChange={handleChange} value={create.allowed_age} class="form-select" aria-label="Default select example">
                                    <option selected>select a valid option</option>
                                    <option value="under 13 years old">under 13 years old</option>
                                    <option value="everyone">everyone</option>
                                    <option value="teenagers">teenagers</option>
                                    <option value="over 18 years old">over 18 years old</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label class="labels">Difficulty level</label>
                                <select name='difficulty_level' onChange={handleChange} value={create.difficulty_level} class="form-select" aria-label="Default select example">
                                    <option selected>select a valid option</option>
                                    <option value="kids">kids</option>
                                    <option value="beginners">beginners</option>
                                    <option value="advanced">advanced</option>
                                    <option value="expert">expert</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label class="labels">Type</label>
                                <select name='type' onChange={handleChange} value={create.type} class="form-select" aria-label="Default select example">
                                    <option selected>select a valid option</option>
                                    <option value="mountain">mountain</option>
                                    <option value="rafting">rafting</option>
                                    <option value="trekking">trekking</option>
                                    <option value="exploring">exploring</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div class="col-4">
                                <label className="labels">Start at</label>
                                <input type="number" className="form-control" name="start_at"
                                    value={create.start_at} min={0} max={24} onChange={handleChange} />
                            </div>
                            <div className="col-4">
                                <label class="labels">End at</label>
                                <input type="number" className="form-control" id="end" name="end_at"
                                    value={create.end_at} min={0} max={24} onChange={handleChange} />
                            </div>
                            {
                                data.id && (
                                    <div className="col-4">
                                        <label className='labels'>Available</label>
                                        <select name="available" onChange={handleChange} value={create.available} class="form-select"
                                            aria-label="Default select example">
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </div>
                                )}
                        </div>
                        <button className="btn border mt-3 btn-primary" type="submit">{data.id ? 'Update' : 'Create'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}