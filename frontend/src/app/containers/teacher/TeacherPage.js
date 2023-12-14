import {Button, Card, Col} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

export const StudentsCard = () => {
    return (
        <Col>
            <Card>
                <Card.Header as="h4">Выбрать студентов</Card.Header>
                <Card.Body>
                    <Card.Title className={"d-flex justify-content-between fs-6"}>
                        Список студентов, которые выбрали Вас научным руководителем
                    </Card.Title>
                    <Link to={"/teacher/choose-student"} className={"btn btn-outline-dark mt-2 fw-medium"}>Перейти ➡️</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export const StudentsListCard = () => {
    return (
        <Col>
            <Card>
                <Card.Header as="h4">Список студентов</Card.Header>
                <Card.Body>
                    <Card.Title className={"d-flex justify-content-between fs-6"}>
                        Список студентов, которых Вы выбрали
                    </Card.Title>
                    <Link to={"/teacher/students-list"} className={"btn btn-outline-dark mt-2 fw-medium"}>Перейти ➡️</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}