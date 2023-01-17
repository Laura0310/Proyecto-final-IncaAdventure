import React, { useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material';
import { CreateReview } from './CreateReview';
import { Notification } from '../notification/Notification';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { getServices } from '../../redux/actions/actions/users';

export const UserActivities = ({ activities }) => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const [notification, setNotification] = useState(false);

    const [data, setData] = useState({})

    useEffect(() => {
        if (activities) {
            dispatch(getServices(activities[0]?.user_activities.UserId))
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

    const getRating = (array) => {
        // a?.activity_rating[0]?.rating || 0

        let rating = array.find((e) => e.UserId == activities[0]?.user_activities.UserId)
        return rating?.rating || 0
    }


    return (
        <div>
            <div class="row text-center m-5 p-3 mx-auto" style={{ maxWidth: "87%" }}>
                {
                    activities?.length ?
                        <h2 className='text-start mb-4'>These are the activities you have signed up for</h2>
                        : <h2>You have no activities yet</h2>
                }
                {
                    activities?.map(a => {
                        let rating = getRating(a?.activity_rating)
                        return (
                            <div class="col-lg-4 col-sm-6 mb-4">
                                <div className="card min-height-activity-card">
                                    <img
                                        src="https://wallpaperaccess.com/full/1099438.jpg"
                                        class="card-img-top"
                                        alt="..."
                                    />
                                    <div class="card-body  w-100">
                                        <h5 class="card-title text-start">{a.name}</h5>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <b className='fs-5 d-flex align-items-center gap-1'>
                                                <StarIcon className='fs-3' style={{ color: rating ? "#faaf00" : "#bdbdbd" }} />
                                                {rating}
                                            </b>
                                            <button className={`btn border mt-3 ${rating ? "btn-secondary" : "btn-primary"} `} disabled={rating} onClick={() => handleOpen(a)}>Add Review</button>
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
