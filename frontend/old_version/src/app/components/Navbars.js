import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useStore} from "../store/useStore";

const Navbars = () => {

    const navigate = useNavigate()

    const {user, logout, reset} = useStore()
    const handleLogout = () => {
        logout()
        reset()
        navigate("/login")
    }

    const teacherLinks = (
        <>
            <NavLink to={"/teacher/choose-student"} className={"nav-link"}>Выбрать студентов</NavLink>
            <NavLink to={"/teacher/students-list"} className={"nav-link"}>Список студентов</NavLink>
        </>
    )

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to={"/home"} className={"navbar-brand fw-medium"}>FQW Tracker</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={"/home"} className={"nav-link"}>Главная</NavLink>
                        {user.role.toString().toLowerCase() === 'teacher' ? teacherLinks : null}
                    </Nav>
                    <Nav>
                        <NavDropdown title={user.email} id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/login" onClick={handleLogout}
                                              className={"text-danger fw-semibold"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                    <path fillRule="evenodd"
                                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>
                                {" "}Выйти
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Navbars