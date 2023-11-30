import React, {useState} from "react";
import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import CSRFToken from "../components/CSRFToken";
import {connect} from "react-redux";
import {login} from "../actions/auth";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formData
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState("")

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false || error) {
            e.stopPropagation();
        }
        const loginUser = async () => {
            await login(email, password);
            if (!isAuthenticated)
                setError("Не правильная почта или пароль!")
        }
        loginUser();
        setValidated(true);
    };

    if (isAuthenticated) {
        return <Navigate to={"/home"}/>;
    }

    return (
        <Container className={"justify-content-center align-items-center d-flex flex-column min-vh-100"}>
            <div className={"justify-content-center align-items-center fs-1 fw-bold mb-4"}>
                <div>Вход</div>
            </div>
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
                    <a href={"/sign-up"} className={"text-primary fw-bold"}>Зарегистрируйтесь</a>
                </p>
            </div>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, {login})(Login);