import React, {Fragment} from 'react'
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {FQWStatus, FQWTheme, PreferTeacher} from "../components/students/StudentPage";
import Layout from "../hocs/Layout";
import {useStore} from "../store/useStore";
import {useShallow} from "zustand/react/shallow";

function Homepage() {
    const user = useStore(useShallow((state)=>state.user))

    const studentLinks = (
        <Fragment>
            <FQWTheme user={user}/>
            <PreferTeacher/>
            <FQWStatus/>
        </Fragment>
    )

    return (
        <Layout title={"Главная"} content={"Главная страница"}>
            <Fragment>
                <Navbars/>
                <Container className={"mt-4"}>
                    <Row xs={1} md={2} className="g-4">
                        {user.role === "STUDENT" && studentLinks}
                        <Col>
                            <Card>
                                <Card.Header as="h5">Featured</Card.Header>
                                <Card.Body>
                                    <Card.Title>Special title treatment</Card.Title>
                                    <Card.Text>
                                        With supporting text below as a natural lead-in to additional content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </Fragment>
        </Layout>
    )
}

export default Homepage