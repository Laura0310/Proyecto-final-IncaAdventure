import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { createUser, getServices, userUpdated } from "../../redux/actions/actions/users";
import { useDispatch, useSelector } from 'react-redux';
import { UserActivities } from '../userComponents/UserActivities';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { UserProducts } from '../userComponents/UserProducts';
import { Notification } from '../notification/Notification';
import { Link } from 'react-router-dom';

const UserPage = () => {
    const { user } = useAuth0();

    const dispatch = useDispatch()
    const userProfile = useSelector((state) => state.userProfile)
    const userServices = useSelector((state) => state.userServices)
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({})


    useEffect(() => {
        if (user) { dispatch(createUser(user)) }
    }, [dispatch, user])

    useEffect(() => {
        if (userProfile.id) {
            console.log("entró")
            console.log(userProfile.id)
            dispatch(getServices(userProfile.id))
            setUpdate({
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                email: userProfile.email,
                language: userProfile.language || "",
                identification: userProfile.identification || "",
                mobile_number: userProfile.mobile_number || "",
                birth_date: userProfile.birth_date || "",
            })
        }
    }, [userProfile])

    console.log("userProfile - userPage", userProfile)

    const handleChange = (e) => {
        const property = e.target.name
        const value = e.target.value

        setUpdate({
            ...update,
            [property]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userUpdated({ ...update, id: userProfile.id }))
        dispatch(createUser({ email: userProfile.email }))
        setOpen(true)
    }

    const checkForm = () => {
        if (
            !update.first_name ||
            !update.last_name ||
            !update.email ||
            !update.language ||
            !update.identification ||
            !update.mobile_number ||
            !update.birth_date
        ) {
            return true
        } else {
            return false
        }
    }


    return (

        <div className="mx-auto my-auto mt-1">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-users-tab" data-bs-toggle="tab" data-bs-target="#nav-users" type="button" role="tab" aria-controls="nav-users" aria-selected="true">Profile</button>
                    <button className="nav-link" id="nav-activities-tab" data-bs-toggle="tab" data-bs-target="#nav-activities" type="button" role="tab" aria-controls="nav-activities" aria-selected="false">Activities</button>
                    <button className="nav-link" id="nav-products-tab" data-bs-toggle="tab" data-bs-target="#nav-products" type="button" role="tab" aria-controls="nav-products" aria-selected="false">Products</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab" tabindex="0">
                    <div className="container rounded bg-light mt-5 mb-5 ">
                        <div className="row bg-light">
                            {
                                !userProfile.is_active && (
                                    <Alert severity="warning">
                                        Please complete the fields below to be able to book activities and buy products — <strong>check it out!</strong>
                                    </Alert>
                                )
                            }
                            <div className="col-md-3 border-right mt-5">
                                <h4 className="text-right">User profile</h4>
                                {userProfile.is_admin && <Link to={"/admin"}><button className='btn btn-outline-primary'>Admin</button></Link>}
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-2" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold"></span><span>{userProfile?.username}</span></div>
                            </div>
                            <div className="col-md-8 border-right">
                                <form onSubmit={handleSubmit}>
                                    <div className="p-3 py-5">
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Name</label>
                                                <input type="text" name='first_name' onChange={handleChange}
                                                    className="form-control" required value={update.first_name} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Surname</label>
                                                <input type="text" name='last_name' onChange={handleChange}
                                                    className="form-control" required value={update.last_name} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <label className="labels">Email</label>
                                                <input type="text" disabled className="form-control" value={update.email} />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className="col-md-6">
                                                <label className="labels">Mobile Number</label>
                                                <input type="text" name='mobile_number' onChange={handleChange}
                                                    className="form-control" value={update.mobile_number} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Birth Date</label>
                                                <input type="text" name='birth_date' onChange={handleChange}
                                                    className="form-control" value={update.birth_date} />
                                            </div>
                                        </div>
                                        <div className="row mt-3 ">
                                            <div className="col-md-6">
                                                <label className="labels">Identification</label>
                                                <input type="text" name='identification' onChange={handleChange}
                                                    className="form-control" required value={update.identification} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Language</label>
                                                <select name='language' value={update.language} onChange={handleChange} class="form-select" aria-label="Default select example">
                                                    <option value=''>Select an option...</option>
                                                    <option value='spanish'>Spanish</option>
                                                    <option value='english'>English</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-5 text-center">
                                            <button className="btn btn-primary profile-button" disabled={checkForm()} type="submit">Save Profile</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-activities" role="tabpanel" aria-labelledby="nav-activities-tab" tabindex="0">
                    <div className='card bg-light'>
                        <UserActivities activities={userServices.userActivities} />
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-products" role="tabpanel" aria-labelledby="nav-products-tab" tabindex="0">
                    <div className='card bg-light'>
                        <UserProducts products={userServices.userProducts} />
                    </div>
                </div>
            </div>
            <Notification setOpen={setOpen} open={open} message={"Profile successfully updated!"} />
        </div>
    )
}

export default UserPage