import React, { useEffect } from "react";
import '../styles/styles.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../redux/actions/actions/reviews";


function HomePage() {

    const allReviews = useSelector(state => state.allReviews);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReviews())
    },[dispatch])

    return (
        <div>
            <div className="container-fluid bg-green">
                <div className="row">
                    <div className="col-lg-6 my-5 py-lg-5 d-flex flex-column align-items-lg-end align-items-center pr-6 justify-content-center">
                        <h1 className="display-4 fw-bold text-center">Inca Adventure</h1>
                        <span className="display-4 fw-bold text-lg-end text-center text-light">The Eco-Adventure</span>
                    </div>
                    <div className="col-lg-6 my-lg-5 py-lg-5 mb-5 d-flex justify-content-lg-start justify-content-center align-items-center pl-6">
                        <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 mb-5 mb-lg-0">
                            <div className="ratio ratio-16x9 d-flex">
                                <iframe
                                    src="https://www.youtube.com/embed/Zk9J5xnTVMA?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&vq=hd1080&origin=https://youtubeembedcode.com"
                                    title="YouTube video"
                                    className="rounded-4 shadow-4-strong"
                                    allowfullscreen=""
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- CARDS --> */}

            <div className="container-fluid bg-light">
                <div className="container py-4">
                    <div className="row text-center">
                        <h2 className="h2 border-bottom pb-1">
                            MOST POPULAR <span className="text-success">ACTIVITIES</span>
                        </h2>
                    </div>
                    <div className="row mt-4 no-interaction border-bottom">
                        {
                            allReviews?.map((e) => (

                                <div className="col-lg-4 col-sm-6">
                                    <div className="card card px-0 my-3">
                                        <img src="https://wallpaperaccess.com/full/1099438.jpg" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h4><b>{e.name}</b></h4>
                                            <span>{e.description}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {/* <div className="col-lg-4 col-sm-6">
                            <div className="card card px-0 my-3">
                                <img src="https://wallpaperaccess.com/full/1099438.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                <h4><b>Journey to Machu Picchu</b></h4>
                                    <span>Complete excursion on the main attraction of Machu Picchu, with personalized walks and many places to take beautiful pictures.</span>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-4 col-sm-6">
                            <div className="card card px-0 my-3">
                                <img src="https://www.tours-machupicchu-peru.com/wp-content/uploads/2021/10/Tour-a-la-Montana-7-Colores-1-Dia.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                <h4><b>Journey to 9 Colors Mountain</b></h4>
                                    <span>One day excursion to the hill of the 9 colors, we can enjoy a unique walk with incomparable experiences, we add gourmet lunch in the same place</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="card card px-0 my-3">
                                <img src="https://www.peru.travel/Contenido/Atractivo/Imagen/en/190/1.1/Principal/pn-huascaran.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                <h4><b>Querococha Lake</b></h4>
                                    <span>Two-day excursion to Lake Querococha, we start at the base of the mountain. Then we will go on an unforgettable hike to the most beautiful lake in Peru.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="card card px-0 my-3">
                                <img src="https://res.cloudinary.com/dboppggbz/image/upload/v1670797600/machu-picchu-rafting-season_1_wwejva.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                <h4><b>Rafting</b></h4>
                                    <span>Immerse yourself in the frozen waters of the Querococha river and enjoy an experience of combined adrenaline and fun. Perfect for the family.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="card card px-0 my-3">
                                <img src="https://res.cloudinary.com/dboppggbz/image/upload/v1670797765/TPM-MachuPicchu-19_1_msjoxq.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                <h4><b>Horse Ride</b></h4>
                                    <span>If you are looking for a quiet experience, we invite you to join the horseback riding activity, a brief 2-hour tour will give you incredible moments</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="card card px-0 my-3">
                                <img src="https://res.cloudinary.com/dboppggbz/image/upload/v1670798975/inca-jungle-to-machupicchu-1920-800_1_dvu9yl.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                <h4><b>Travel into the Deep of Cusco</b></h4>
                                    <span>Full day hike through the most unknown places of Machu Picchu, narrow trails and hanging bridges, the best possible experience to connect with nature</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* <!-- FOOTER --> */}

            <footer className="container-fluid bg-light px-0">
                <div className="container py-lg-5 py-4">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 px-4">
                            <span className="h5">ABOUT US</span>
                            <p>
                                Welcome to our Inca Adventure page, a web project that we carry out with a team of 5 colleagues for educational purposes, we want to be able to offer a wide variety of activities in the Cuzco region
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-6 px-4 mt-md-0 mt-3">
                            <span className="h5">CONTACT US</span>
                            <p>
                                All the feedback that you can provide to us is really usefull, if something can be better on this web page, let us know!
                                Please fill the following form and share whit us what you think, thanks!

                            </p>
                            <div className="row container">
                                <Link to={{ pathname: "https://whatsapp.com/" }} target="_blank" className="col-4"><a><WhatsAppIcon /></a></Link>
                                <Link to={{ pathname: "https://github.com/" }} target="_blank" className="col-4"><a><GitHubIcon /></a></Link>
                                <Link to={{ pathname: "https://instagram.com/" }} target="_blank" className="col-4"><a><InstagramIcon /></a></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 px-4 mt-lg-0 mt-3">
                            <form>
                                <div className="mb-1">
                                    <label for="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" />
                                </div>
                                <div className="mb-1">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" />
                                </div>
                                <div className="form-group mb-1">
                                    <label className="form-label" for="message ">Message</label>
                                    <textarea className="form-control" id="message" name="message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="container-fluid bg-dark text-center footer py-2">
                <span className="text-muted">Copyrigth 2022-2023 IncaAdventure SA - pending pattent &#174;</span>
            </footer>

        </div>
    );
}

export default HomePage;
