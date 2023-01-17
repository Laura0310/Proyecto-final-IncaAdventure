import React, { useState } from "react";
import ActivitiesAdmin from "../adminComponents/ActivitiesAdmin.js";
import Logout from '../nav/Logout.js';
import ProductsAdmin from '../adminComponents/ProductsAdmin'
import UsersAdmin from "../adminComponents/UsersAdmin.js";
import HikingIcon from '@mui/icons-material/Hiking';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';



const Dashboard = () => {


  return (
    <div
      className="row"
    >
      <div className="col-2 border-top mx-auto pt-4  viewport-height-content">
        <div id="sidebar">
          <h4 className="text-center mb-4 fw-bold text-primary">Dashboard</h4>
          <div className="row">
            <div className="col-lg-12 col-sm-6 col-12 ml-">
              <h6 className="p-1 border-bottom fw-bold">Components</h6>
              <div className="d-flex flex-column gap-3 mt-4" id="list-tab" role='tablist'>
                <a
                  className="list-group-item list-group-item-action active a"
                  id="list-activities-list"
                  data-bs-toggle="list"
                  href="#list-activities"
                  role="tab"
                  aria-controls="activities"
                >
                  <HikingIcon /> Activities
                </a>
                <a
                  className="list-group-item list-group-item-action a"
                  id="list-products-list"
                  data-bs-toggle="list"
                  href="#list-products"
                  role="tab"
                  aria-controls="products"
                >
                  <LocalOfferIcon /> Products
                </a>

                <a
                  className="list-group-item list-group-item-action a"
                  id="list-users-list"
                  data-bs-toggle="list"
                  href="#list-users"
                  role="tab"
                  aria-controls="users"
                >
                  <PersonIcon /> Users
                </a>
              </div>
              <div className="mt-5 text-center"><Logout /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-10 border bg-light">
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="list-activities"
            role="tabpanel"
            aria-labelledby="list-activities-list"
          >
            <div className="row">
              <ActivitiesAdmin />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="list-products"
            role="tabpanel"
            aria-labelledby="list-products-list"
          >
            <div className="row">
              <ProductsAdmin />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="list-users"
            role="tabpanel"
            aria-labelledby="list-users-list"
          >
            <div className="row ">
              <UsersAdmin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
