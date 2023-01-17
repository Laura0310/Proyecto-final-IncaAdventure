import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createActivityReview, createProductReview } from '../../redux/actions/actions/reviews'
import { Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    1: 'Very dissatisfied',
    2: 'Dissatisfied',
    3: 'Neutral',
    4: 'Satisfied',
    5: 'Very satisfied',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const CreateReview = ({ handleClose, data, setNotification }) => {

    const [hover, setHover] = useState(-1);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const [create, setCreate] = useState({
        rating: 0,
        comments: '',
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
        if (create.rating < 1) {
            return alert('You must to select a rating')
        }
        console.log(data)
        if (data.user_products) {
            dispatch(createProductReview({ ...create, id: data.id, userId: data.user_products.UserId }))
        } else if (data.user_activities) {
            dispatch(createActivityReview({ ...create, id: data.id, userId: data.user_activities.UserId }))
        }

        setNotification(true)
        setCreate({
            rating: -1,
            comments: '',
        })
        handleClose()
    }
    return (
        <div>
            <div className="mx-auto rounded mt-5 mb-5">
                <div className='px-5 mx-auto'>
                    <h4 className='mt-3 mb-4 text-center'>Tell us about your experience!</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div class="col-lg-12 mb-3 mt-2">
                                <label className='mb-1'>Rating</label>
                                <Box
                                    sx={{
                                        width: 300,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        name="hover-feedback"
                                        value={create.rating}
                                        precision={1}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setCreate({...create, rating: newValue})
                                        }}
                                        size='large'
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {create.rating !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : create.rating]}</Box>
                                    )}
                                </Box>
                            </div>

                            <div class="col-lg-12">
                                <label>Comment</label>
                                <textarea rows={4} type="text" name='comments' value={create.comments}
                                    required onChange={handleChange} className="form-control" />
                            </div>
                            <div className='w-100 d-flex justify-content-center'>
                                <button className="btn border mt-3 btn-primary" type="submit">Done</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
