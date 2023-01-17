import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../redux/actions/actions/activities.js";
import { Paginate } from '../nav/Paginate.js'
import { Stack, Pagination } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from "../../redux/actions/actions/stores.js";
import { Link } from "react-router-dom";


const initialState = {
  name: '',
  order: '',
  orderBy: '',
  min: null,
  max: null,
  type: '',
  page: 1,
}

function ActivitiesPage() {
  const allActivities = useSelector(state => state.allActivities);
  const [filter, setFilter] = useState(initialState)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities(filter));
  }, [filter, dispatch]);


  function handleChange(e) {

    if (e.target.value == "A-Z") {
      setFilter({ ...filter, order: "ASC", orderBy: "name" })

    } else if (e.target.value == "Z-A") {
      setFilter({ ...filter, order: "DESC", orderBy: "name" })

    } else if (e.target.value == 'higher_price') {
      setFilter({ ...filter, order: "DESC", orderBy: "price" })

    } else if (e.target.value == 'lower_price') {
      setFilter({ ...filter, order: "ASC", orderBy: "price" })

    } else {
      console.log('entro')
      setFilter({ ...filter, [e.target.name]: e.target.value })
    }
  };

  function handleCart(e) {
    dispatch(addToCart({ ...e, category: 'activity', quantity: 1 }))
  }

  const handlePagination = (event, page) => {
    setFilter({ ...filter, page: page })
  }


  return (
    <div className="container-fluid bg-light px-0 mx-0">
      <div className="container bg-white py-4 pl-7">
        <div className="row text-center">
          <h2 className="h1">
            In search of adventures? FIND IT <span className="text-success">WITH US</span>
          </h2>
        </div>
        <div className="row mt-lg-5 mt-4 justify-content-lg-start justify-content-center px-3">
          <div id="sidebar" className="col-lg-2 col-12 d-flex flex-column border py-2 text-center rounded mb-4">
            <h2 className="text-center mb-4 fw-bold text-success">Activities</h2>
            <div className="row">

              <div className="col-lg-12 col-sm-6 col-12">
                <h6 className="p-1 border-bottom fw-bold">Filter By</h6>
                <ul>
                  <li><button name='type' value='mountain' onClick={handleChange} className='btn-transparent'>Mountain</button></li>
                  <li><button name='type' value='rafting' onClick={handleChange} className='btn-transparent'>Rafting</button></li>
                  <li><button name='type' value='trekking' onClick={handleChange} className='btn-transparent'>Trekking</button></li>
                  <li><button name='type' value='exploring' onClick={handleChange} className='btn-transparent'>Exploring</button></li>
                </ul>
                <div>
                  <input className='form-control' type="text" placeholder="Search by word..." name="name" onChange={handleChange} ></input>
                </div>
              </div>

              <div className="col-lg-12 col-sm-6 col-12">
                <div>
                  <h6 className="p-1 border-bottom fw-bold mt-3">Order By</h6>

                </div>

                <div className="mt-3">
                  <form className="ml-md-2 ">
                    <div className="form-inline border rounded p-sm-2 my-2">
                      <input type="radio" name="type" value="A-Z" id="higher" onChange={handleChange} />
                      <label for="higher" className="pl-1 pt-sm-0 pt-1">&nbsp;Alphabetical, A-Z</label>
                    </div>
                    <div className="form-inline border rounded p-sm-2 my-2">
                      <input type="radio" name="type" value="Z-A" id="lower" onChange={handleChange} />
                      <label for="lower" className="pl-1 pt-sm-0 pt-1">&nbsp;Alphabetical, Z-A</label>
                    </div>
                    <div className="form-inline border rounded p-sm-2 my-2">
                      <input type="radio" name="type" value="higher_price" id="lower" onChange={handleChange} />
                      <label for="lower" className="pl-1 pt-sm-0 pt-1">&nbsp;Higher price</label>
                    </div>
                    <div className="form-inline border rounded p-sm-2 my-2">
                      <input type="radio" name="type" value="lower_price" id="lower" onChange={handleChange} />
                      <label for="lower" className="pl-1 pt-sm-0 pt-1">&nbsp;Lower price</label>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
          <div className="col-lg-10 px-lg-3 px-0">
            <div className="row text-center">
              {
                allActivities?.rows?.map(a => {
                  return (
                    <div className="col-lg-4 col-sm-6 mb-4">
                      <div className="card min-height-activity-card">
                        <Link to={`/detail/activity/${a.id}`}>
                          <img
                            src={a.image}
                            className="card-img-top"
                            alt="..."
                          />
                        </Link>
                        <div className="card-body">
                          <h5 className="card-title">{a.name}</h5>
                          <p className="card-title fst-italic">{a.type}</p>
                          <p className="card-title fw-bolder">
                            ${a.price}
                          </p>
                        <div className="col-lg-4 w-100">
                          <button className="btn btn-primary w-100" onClick={() => handleCart(a)}>Add <AddShoppingCartIcon /></button>
                        </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <Stack className='mt-3 w-100' spacing={2}>
          <Pagination onChange={handlePagination} page={Number(allActivities.page)} className='mx-auto' count={allActivities.totalPages} shape="rounded" />
        </Stack>
      </div>
      <footer className="container-fluid bg-dark text-center py-2">
        <span className="text-muted">Copyrigth 2022-2023 IncaAdventure SA - pending pattent &#174;</span>
      </footer>
    </div>
 
  );
}

export default ActivitiesPage;
