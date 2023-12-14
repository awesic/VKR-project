import React, {useEffect, useState} from "react";
import {Button, Container, FloatingLabel, Form, Spinner} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Layout from "../hocs/Layout";
import CSRFToken from "../components/CSRFToken";
import {useStore} from "../store/useStore";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formData

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || "/home"

    const { user, loading, isError, isSuccess, login, reset, getUserInfo } = useStore()

    const [validated, setValidated] = useState(false)
    const [error, setError] = useState("")

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        const userData = {email, password}
        login(userData)
        setValidated(true);
    };
    useEffect(() => {
        if (isError) {
            setError("Не правильная почта или пароль!")
        } else if (isSuccess && user) {
            navigate(fromPage)
            getUserInfo()
        }

        reset()
    }, [isError, isSuccess, user, navigate, fromPage, getUserInfo, reset]);

    return (
        <Layout title={"Вход"} content={"Страница входа"}>
            <Container className={"justify-content-center align-items-center d-flex flex-column vh-100"}>
                <div className={"justify-content-center align-items-center fs-1 fw-bold mb-4"}>
                    <div>Вход</div>
                </div>
                {loading ? <Spinner variant={"secondary"} animation={"border"}/> : null}
                <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}
                      className={"align-items-center justify-content-center align-self-center text-center"}
                      style={{minWidth: '38vh'}}>
                    <CSRFToken/>
                    <Form.Label className={"text-start text-danger"}>
                        {error ? error : null}
                    </Form.Label>
                    <Form.Group className={"mb-3 "}
                                controlId="formBasicEmail">
                        <FloatingLabel label={"Почта"}>
                            <Form.Control
                                required
                                name={"email"}
                                type="email"
                                placeholder="Введите почту"
                                value={email}
                                onChange={e => onChange(e)}
                                className={"rounded-3"}/>
                            <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                                {!email ? "Это поле обязательно." : null}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className={"mb-3"} controlId="formBasicPassword">
                        <FloatingLabel label={"Пароль"}>
                            <Form.Control
                                required
                                name={"password"}
                                type="password" placeholder="Пароль"
                                value={password}
                                onChange={e => onChange(e)}
                                className={"rounded-3"}/>
                            <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                                {!password ? "Это поле обязательно." : null}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" type="submit" className={"fw-medium rounded-4"}>ВОЙТИ</Button>
                </Form>
                <div className={"mt-3"}>
                    <p className={"mb-0 text-center"}>
                        Еще нет аккаунта?{" "}
                        <Link to={"/sign-up"} className={"text-primary fw-bold"}>Зарегистрируйтесь</Link>
                    </p>
                </div>
            </Container>
        </Layout>
    );
}
export default Login