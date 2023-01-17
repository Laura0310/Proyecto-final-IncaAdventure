import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import s from '../styles/LandingPage.module.css'
import video from '../../Media/Video2.mp4'
import img from '../../Media/button.png'



const LandingPage = () => {

  const person = [
    {
      name: "Obaseki Nosa",
      location: "Lagos",
    },
    {
      name: "Obaseki Nosa",
      location: "Lagos",
    },
  ]

  useEffect(() => {
    window.localStorage.setItem('shopping_cart', JSON.stringify(person));
    const respuesta = JSON.parse(window.localStorage.getItem('shopping_cart'));
    console.log(respuesta);
    window.localStorage.removeItem('shopping_cart');
  }, [])

  return (
    <div className="z-index-1000">
      <video muted autoPlay loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className={s.button}>
        <Link to="/home">
          <button className="btn">
            <img src={img} alt="" />{" "}
            <h1 className=" bg-image color-danger text-center"><b className="border btn text-white">JOIN THE <a>ADVENTURE</a></b></h1>
          </button>
        </Link>
       
      </div>
    </div>
  );
};

export default LandingPage;