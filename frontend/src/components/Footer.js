import React, {Fragment} from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <Fragment>
            <footer className="container mt-3 py-3 fixed-bottom">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link to={"/home"} className={"nav-link px-2 text-body-secondary"}>На
                        главную</Link></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
                </ul>
                <p className="text-center text-body-secondary">© 2023 FQW Tracker</p>
            </footer>
        </Fragment>
    );
};
export default Footer;