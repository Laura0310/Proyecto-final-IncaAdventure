import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions/actions/detail";
import Rating from '@mui/material/Rating';
import { Modal, Box, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HikingIcon from '@mui/icons-material/Hiking';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AccountCircle from "@mui/icons-material/AccountCircle";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
};

export const DetailPage = () => {

  let { id, category } = useParams();

  const [open, setOpen] = useState(false);
  const detail = useSelector(state => state.detail);
  const dispatch = useDispatch()

  const handleOpen = (data) => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getDetail({ id, category }))
  }, [id, category])

  console.log(detail);
  return (
    <div className=" pb-5 mt-0 mb-0">
      <div className="container pt-4 pb-5">
        <div className="row justify-content-center border rounded pb-5 mt-5 pt-5 bg-light px-4">
          <div className="col-md-7 col-lg-5 mb-5 mb-lg-0 wow fadeIn pt-3 mt-3">
            <div className="card border-0 shadow mx-3">
                <img
                  src={detail.image}
                  alt="..."
                />
              <div className="card-body p-4">
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <h3 className="h3 mb-0 capitalize text-start">{detail.name}</h3>
                  <div className="d-flex align-items-center gap-2">
                    <Rating precision={0.1} name="read-only" value={parseFloat(detail.avgRating)} readOnly />
                    <div className="fw-bold fs-5">{detail.avgRating ? parseFloat(detail.avgRating).toFixed(1) : 0}</div>
                  </div>
                </div>
                <div>
                  <ul className="text-start">
                    <li className="mb-2"><TaskAltIcon /><b> Available: </b>{detail.available ? 'yes' : 'no'}</li>
                    {detail.difficulty_level && <li className="mb-2"><HikingIcon /><b> Difficulty: </b>{detail.difficulty_level}</li>}
                    {detail.allowed_age && <li className="mb-2"><AccessibilityNewIcon /><b> Allowed age: </b>{detail.allowed_age}</li>}
                    {detail.start_at && <li className="mb-2"><AccessTimeIcon /><b> Time schedule: </b>{detail.start_at} - {detail.end_at}</li>}
                    {detail.stock && <li className="mb-2"><Inventory2Icon /><b> Stock: </b>{detail.stock}</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 pt-3">
            <div className="ps-lg-1-6 ps-xl-5">
              <div className="mb-3 wow fadeIn">
                <div className="text-start mb-1-6 wow fadeIn">
                  <h2 className="h1 mb-0 text-primary capitalize">
                    {detail.name}
                  </h2>
                  <p className="mt-4">{detail.description}</p>
                  {
                    category == 'activity' &&
                    <>
                      <h4 className="text-primary mt-4">Schedule</h4>
                      <p>{detail.schedule}</p>
                    </>
                  }
                </div>
              </div>
              <div className="mb-5 wow fadeIn">
                <div className="row mt-n4">
                  <div className="col-sm-6 col-xl-4 mt-4">
                    <div className="card text-center border-0 rounded-3">
                      <div className="card-body">
                        <i className="ti-bookmark-alt icon-box medium rounded-3 mb-4"></i>
                        {
                          category === 'activity' ?
                            <>
                              <h3 className="h5 mb-3">Advance Booking</h3>
                              <p className="mb-0">Required</p>
                            </>
                            :
                            <>
                              <h3 className="h5 mb-3">Shipping</h3>
                              <p className="mb-0">Available</p>
                            </>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-4 mt-4">
                    <div className="card text-center border-0 rounded-3">
                      <div className="card-body">
                        <i className="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
                        <h3 className="h5 mb-3">Price</h3>
                        <p className="mb-0">${detail.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-4 mt-4">
                    <div className="card text-center border-0 rounded-3">
                      <div className="card-body">
                        <i className="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
                        <h3 className="h5 mb-3">Category</h3>
                        <p className="mb-0 capitalize">{detail.type || 'Product'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-n4">
                <div className="text-center mb-1-6 wow fadeIn w-100">
                  <div className="d-flex align-items-center justify-content-center gap-2 mx-auto mb-2">
                    <h2 className="mb-0 text-primary">Reviews</h2>
                    <h4 className="mb-0 text-primary fs-5 pt-1"> ({detail.reviews?.length})</h4>
                  </div>
                  {
                    detail.reviews?.length ? <button className="btn btn-outline-secondary text-dark btn-sm" onClick={handleOpen}>View all reviews</button> : <span>No reviews yet</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-5">
            <h2 className="text-center mb-4">Reviews</h2>
            {
              detail?.reviews?.map((e) => (
                <div className=" w-100 mb-4">
                  <div className="d-flex gap-2">
                    <AccountCircle />
                    <h6>{e.User.first_name} {e.User.last_name}</h6>
                  </div>
                  <div>
                    <div className="d-flex w-100 justify-content-between">
                      <Rating name="read-only" value={Number(e.rating)} readOnly />
                      <p>{e.User.createdAt.slice(0, 10)}</p>
                    </div>
                    <p>{e.comments}</p>
                  </div>
                  <Divider />
                </div>
              ))
            }
          </div>
        </Box>

      </Modal>
    </div>
  );
};
