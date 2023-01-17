import React, { useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material';
import { CreateReview } from './CreateReview';
import { Notification } from '../notification/Notification';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { getServices } from '../../redux/actions/actions/users';


export const UserProducts = ({ products }) => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (products) {
            dispatch(getServices(products[0]?.user_products.UserId))
        }
    }, [notification])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 5,
    };

    const handleOpen = (a) => {
        setOpen(true)
        setData(a)
    };
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div class="row text-center m-5 p-3">
                {
                    products?.length ?
                        <h2 className='text-start mb-4'>These are the products you have purchased</h2>
                        : <h2>You have no products yet</h2>
                }
                {
                    products?.map(a => {
                        let rating = a?.product_rating[0]?.rating || 0
                        return (
                            <div class="col-lg-4 col-sm-6 mb-4">
                                <div className="card min-height-activity-card">
                                    <img
                                        src="https://wallpaperaccess.com/full/1099438.jpg"
                                        class="card-img-top"
                                        alt="..."
                                    />
                                    <div class="card-body w-100">
                                        <h5 class="card-title text-start">{a.name}</h5>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <b className='fs-5 d-flex align-items-center gap-1'>
                                                <StarIcon className='fs-3' style={{ color: rating ? "#faaf00" : "#bdbdbd" }} />
                                                {rating}
                                            </b>
                                            <button className={`btn border mt-2 ${rating ? "btn-secondary" : "btn-primary"} `} disabled={rating} onClick={() => handleOpen(a)}>Add Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateReview handleClose={handleClose} data={data} setNotification={setNotification} />
                </Box>
            </Modal>
            <Notification setOpen={setNotification} open={notification} message='Review Created!' />
        </div>
    )
}
