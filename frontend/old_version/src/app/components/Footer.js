import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";

const Footer = () => {
    return (<Fragment>
            <footer className="footer mt-auto py-3 fixed-bottom">
                <Container>
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    {/*    <li className="nav-item"><Link to={"/home"} className={"nav-link px-2 text-body-secondary"}>На*/}
                    {/*        главную</Link>*/}
                    {/*    </li>*/}
                    </ul>
                    <p className="text-center text-body-secondary">© 2023 FQW Tracker</p>
                </Container>
            </footer>
        </Fragment>);
};
export default Footer;