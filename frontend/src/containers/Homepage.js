import React, {Fragment} from 'react'
import Navbars from "../components/Navbars";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";
import {Badge, Button, Card, CardGroup, Col, Container, Nav, Row} from "react-bootstrap";
import {FQWTheme} from "../components/students/StudentPage";

function Homepage() {
    const {userInfo} = useSelector((state) => state.user)

    const studentLinks = (
        <Fragment>
            <FQWTheme userInfo={userInfo}/>
            <Col>
                <Card>
                    <Card.Header as="h4">Научный руководитель</Card.Header>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-between"}>
                            {userInfo.prefer_teacher ? userInfo.prefer_teacher : "Преподаватель не выбран"}
                            <Badge pill
                                   className={"bg-success-subtle border border-success-subtle text-success-emphasis"}>
                                Не выбран</Badge>
                        </Card.Title>
                        <Button className={"mt-2 fw-medium"} variant="outline-dark">Изменить</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header as="h4">Статус выполнения ВКР</Card.Header>
                    <Card.Body>
                        <Card.Title>{userInfo.email}</Card.Title>
                        <Button className={"mt-2 fw-medium"} variant="outline-dark">Изменить</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Fragment>
    )

    return (
        <Fragment>
            <Navbars/>
            <Container className={"mt-4"}>
                <Row xs={1} md={2} className="g-4">
                    {userInfo.role === "STUDENT" && studentLinks}
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
    )
}

export default Homepage