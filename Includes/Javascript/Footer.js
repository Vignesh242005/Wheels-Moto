import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h2><span>WHEELS</span>Moto</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum ea quo ex ullam laboriosam magni totam, facere eos iure voluptate.</p>
                            <div className="footer-icons">
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/About">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/Contact">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/Services">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/Accessories">Accessories</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Details</h5>
                            <p><i class="fa-solid fa-phone-volume"></i> +91</p>
                            <p><i class="fa-solid fa-envelope"></i> V2webbuilders@gmail.com</p>
                            <p><i class="fa-solid fa-paper-plane"></i> Dubai,Dubai Bus stand</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Last-footer'>
                <p>Design By V2 Web Builders</p>
            </div>
        </>
    )
}

export default Footer