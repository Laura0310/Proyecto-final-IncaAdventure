import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login.js";
import Traslate from "./Traslate.js";
import { useAuth0 } from "@auth0/auth0-react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux'
import { setLocalStorageCart } from "../../redux/actions/actions/stores.js";
import { createUser } from "../../redux/actions/actions/users.js";

function Nav() {

  const { logout, user } = useAuth0();

  const shoppingCart = useSelector((state) => state.shoppingCart)

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
    window.localStorage.removeItem('shoppingCart')
    window.localStorage.removeItem('user_id')
  }

  return (
    <div style={{ height: "55px" }} className="w-100 ">
      <nav class="navbar navbar-expand-lg bg-light border-bottom fixed-top w-100 z-index-10" style={{ height: "55px" }}>
        <div class="container-fluid pr-5">
          <Link className="pr-4" to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4135/4135890.png"
              width="40px"
              height="40px"
              alt="icon"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse bg-light ml-5" id="navbarSupportedContent">
            <ul style={{ marginLeft: "20px" }} className="navbar-nav me-auto mb-2 mb-lg-0 ml-4 pl-4">
              <li className="nav-item">
                <Link className="nav-link mt-1 pl-3" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mt-1" to="/activities">
                  Activities
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link mt-1" to="/shop">
                  Shop
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 align-items-center mr-5">
              <li>
                <Link className="nav-link mt-1 d-flex gap-1" to="/cart">
                  <ShoppingCartIcon className={shoppingCart.length && `text-primary`} />
                  <b> {shoppingCart.length ? shoppingCart.length : ""}</b>
                </Link>
              </li>
              {
                !user ? (
                  <li className="nav-item btn">
                    <Login />
                  </li>
                ) : (
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {user.nickname}
                    </a>
                    <ul class="dropdown-menu">
                      <li><Link to="/profile" class="dropdown-item">Profile</Link></li>
                      <li><button onClick={handleLogout} class="dropdown-item" href="#">Sign out</button></li>
                    </ul>
                  </li>
                )
              }
            </ul>
            <div className="nav-item d-flex justify-content-center mx-2">
              <Traslate />
            </div>
          </div>
        </div>
      </nav >
    </div >
  );
}

export default Nav;
