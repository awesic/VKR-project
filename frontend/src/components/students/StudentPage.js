import React, {useState} from "react";
import {Badge, Button, Card, Col, Form, Modal} from "react-bootstrap";
import TeacherSelectionForm from "./TeacherSelectionForm";
import {useStore} from "../../store/useStore";
import {useShallow} from "zustand/react/shallow";
import CSRFToken from "../CSRFToken";
import StatusSelectionForm from "./StatusSelectionForm";

export const FQWTheme = ({user}) => {
    const [show, setShow] = useState(false);
    const [new_theme, setNew_Theme] = useState({
        theme: ""
    })
    // const dispatch = useDispatch()
    const {changeStudentTheme, getUserInfo} = useStore()
    const onChange = (e) => setNew_Theme({theme: e.target.value});
    const handleSubmit = (e) => {
        e.preventDefault();

        changeStudentTheme(new_theme)
        setShow(false)
        getUserInfo()
    };

    const handleClose = () => {
        setNew_Theme({theme: user.theme})
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
                            {new_theme.theme ? new_theme.theme : user.theme ? user.theme : "Выберите тему ↙️"}
                            {user.theme_approved ?
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
                title={"Изменить тему"} placeholder={user.theme}
                onChange={onChange} handleSubmit={handleSubmit}/>
        </>
    )
}

export const PreferTeacher = () => {
    const [show, setShow] = useState(false);
    const [teacher, setTeacher] = useState({
        prefer_teacher: "",
        full_name: ""
    })

    // const dispatch = useDispatch()
    const {changeStudentTeacher, getUserInfo} = useStore()
    const user = useStore(useShallow(state => state.user))
    const handleTeacherSelect = (teacherId, teacherFullName) => {
        setTeacher({prefer_teacher: teacherId, full_name: teacherFullName})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        changeStudentTeacher(teacher)
        setShow(false)
        getUserInfo()
    };

    const handleClose = () => {
        setTeacher({prefer_teacher: user.prefer_teacher, full_name: user?.teacher_full_name})
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
                            {teacher.full_name ? teacher.full_name : (user.teacher_full_name ? user.teacher_full_name : "Преподаватель не выбран")}
                            {user.teacher_approved ?
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
                        <CSRFToken/>
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

export const FQWStatus = () => {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState({
        status: "",
        status_name: ""
    })

    // const dispatch = useDispatch()
    const {changeStudentStatus, getUserInfo} = useStore()
    const user = useStore(useShallow(state => state.user))
    const handleStatusSelect = (status, status_ame) => {
        setStatus({status: status, status_name: status_ame})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        changeStudentStatus(status)
        setShow(false)
        getUserInfo()
    };

    const handleClose = () => {
        setStatus({status: user.status, status_name: user?.status_name})
        setShow(false)
    };

    const handleShow = () => setShow(true);

    return (
        <>
            <Col>
                <Card>
                    <Card.Header as="h4">Статус выполнения ВКР</Card.Header>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-between"}>
                            {status.status_name ? status.status_name : user.status_name}
                        </Card.Title>
                        <Button className={"mt-2 fw-medium"} variant="outline-dark"
                                onClick={handleShow}>Изменить</Button>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить статус</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <CSRFToken/>
                        <Form.Group>
                            <StatusSelectionForm
                                selectedStatus={status.status}
                                onSelectedStatus={handleStatusSelect}/>
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
                        <CSRFToken/>
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