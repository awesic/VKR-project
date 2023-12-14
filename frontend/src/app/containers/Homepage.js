import React, {Fragment} from 'react'
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Layout from "../hocs/Layout";
import {useStore} from "../store/useStore";
import {useShallow} from "zustand/react/shallow";
import {FQWStatus, FQWTheme, PreferTeacher} from "./student/StudentPage";
import {StudentsCard, StudentsListCard} from "./teacher/TeacherPage";

function Homepage() {
    const user = useStore(useShallow((state)=>state.user))

    const studentLinks = (
        <Fragment>
            <FQWTheme user={user}/>
            <PreferTeacher/>
            <FQWStatus/>
        </Fragment>
    )

    const teacherLinks = (
        <>
            <StudentsCard/>
            <StudentsListCard/>
        </>
    )

    return (
        <Layout title={"Главная"} content={"Главная страница"}>
            <Fragment>
                <Navbars/>
                <Container className={"mt-4"}>
                    <Row xs={1} md={2} className="g-4">
                        {user.role.toString().toLowerCase() === "student" && studentLinks}
                        {user.role.toString().toLowerCase() === "teacher" && teacherLinks}
                    </Row>
                </Container>
                {/*<Footer/>*/}
            </Fragment>
        </Layout>
    )
}

export default Homepage