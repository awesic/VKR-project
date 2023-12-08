import React, {useEffect, useState} from "react";
import {Badge, Button, Card, Col, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeStudentTheme, getUserInfo, changeStudentTeacher} from "../../features/authSlice";
import axios from "axios";
import {BACKEND_DOMAIN} from "../../features/authService";
import TeacherSelectionForm from "./TeacherSelectionForm";

export const FQWTheme = ({userInfo}) => {
    const [show, setShow] = useState(false);
    const [new_theme, setNew_Theme] = useState({
        theme: ""
    })
    const dispatch = useDispatch()
    const onChange = (e) => setNew_Theme({theme: e.target.value});
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(changeStudentTheme(new_theme))
        // dispatch(getUserInfo())
        setShow(false)
    };

    const handleClose = () => {
        setNew_Theme({theme: userInfo.theme})
        setShow(false)
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <Col>
                <Card>
                    <Card.Header as="h4">Тема ВКР</Card.Header>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-between"}>
                            {new_theme.theme ? new_theme.theme : userInfo.theme ? userInfo.theme : "Выберите тему ↙️"}
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

            <ModalWindow
                show={show} handleClose={handleClose}
                title={"Изменить тему"} placeholder={userInfo.theme}
                onChange={onChange} handleSubmit={handleSubmit}/>
        </>
    )
}

export const PreferTeacher = ({userInfo}) => {
    const [show, setShow] = useState(false);
    const [teacher, setTeacher] = useState({
        prefer_teacher: "",
        full_name: ""
    })

    const dispatch = useDispatch()
    const handleTeacherSelect = (teacherId, teacherFullName) => {
        setTeacher({prefer_teacher: teacherId, full_name: teacherFullName})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(changeStudentTeacher(teacher))
        // dispatch(getUserInfo())
        setShow(false)
    };

    const handleClose = () => {
        setTeacher({prefer_teacher: userInfo.prefer_teacher, full_name: userInfo?.teacher_full_name})
        setShow(false)
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <Col>
                <Card>
                    <Card.Header as="h4">Научный руководитель</Card.Header>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-between"}>
                            {teacher.full_name ? teacher.full_name : userInfo.teacher_full_name ? userInfo.teacher_full_name : "Преподаватель не выбран"}
                            {userInfo.teacher_approved ?
                                <Badge pill
                                       className={"bg-success-subtle border border-success-subtle text-success-emphasis"}>
                                    Утвержден</Badge>
                                :
                                <Badge pill
                                       className={"bg-warning-subtle border border-warning-subtle text-warning-emphasis"}>
                                    Не утвержден</Badge>
                            }
                        </Card.Title>
                        <Button className={"mt-2 fw-medium"} variant="outline-dark"
                                onClick={handleShow}>Изменить</Button>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Выбрать научного руководителя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <TeacherSelectionForm
                                selectedTeacher={teacher.prefer_teacher}
                                onSelectedTeacher={handleTeacherSelect}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" type={"submit"} onClick={handleSubmit}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const ModalWindow = ({show, handleClose, title, placeholder, onChange, handleSubmit}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type={"text"}
                                placeholder={placeholder}
                                autoFocus
                                onChange={onChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" type={"submit"} onClick={handleSubmit}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}