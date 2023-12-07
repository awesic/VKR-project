import React, {useState} from "react";
import {Badge, Button, Card, Col, Form, Modal} from "react-bootstrap";

export const FQWTheme = ({userInfo}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Col>
                <Card>
                    <Card.Header as="h4">Тема ВКР</Card.Header>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-between"}>
                            {userInfo.theme ? userInfo.theme : "Выберите тему ↙️"}
                            {userInfo.theme_approved ?
                                <Badge pill
                                       className={"bg-success-subtle border border-success-subtle text-success-emphasis"}>
                                    Утверждена</Badge>
                                :
                                <Badge pill
                                       className={"bg-warning-subtle border border-warning-subtle text-warning-emphasis"}>
                                    Не утверждена</Badge>
                            }
                        </Card.Title>
                        <Button className={"mt-2 fw-medium"} variant="outline-dark"
                                onClick={handleShow}>Изменить</Button>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить тему</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type={"text"}
                                placeholder={userInfo.theme}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}