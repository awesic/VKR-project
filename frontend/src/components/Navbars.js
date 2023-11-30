import React, {Fragment} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {Link, NavLink} from "react-router-dom";

const Navbars = ({logout, profile}) => {
    const studentLinks = (
        <Fragment>
            {/*<Nav.Link href="/student/dashboard">Dash</Nav.Link>*/}
            <NavLink to={"/student/dashboard"} className={"nav-link"}>Dash</NavLink>
        </Fragment>
    )
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to={"/home"} className={"navbar-brand"}>FQW Tracker</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {profile.role === "STUDENT" ? studentLinks : null}
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                        <NavDropdown title={profile.email} id="collapsible-nav-dropdown">
                            {/*<NavDropdown.Item href="#action/3.1">Профиль</NavDropdown.Item>*/}
                            {/*<NavDropdown.Divider/>*/}
                            <NavDropdown.Item href="/login" onClick={logout} className={"text-danger fw-semibold"}>
                                Выйти
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, {logout})(Navbars);