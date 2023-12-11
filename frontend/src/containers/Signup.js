import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Container, Form, Spinner} from "react-bootstrap";
import MainInputFields from "../components/MainInputFields";
import Radios from "../components/Radios";
import Layout from "../hocs/Layout";
import CSRFToken from "../components/CSRFToken";
import {useStore} from "../store/useStore";

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        patronymic: "",
        email: "",
        password: "",
        password2: "",
        // institute: "",
        // specialization: "",
        graduate_year: new Date().getFullYear(),
        role: ""
    });

    const navigate = useNavigate()

    const { user, loading, isError, isSuccess, message, register, reset, getUserInfo } = useStore()

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    const ValidateValue = (InputValue) => {
        let errors = {};
        if (InputValue.password !== InputValue.password2) {
            errors.password = "Пароли не совпадают!";
        }
        if (!InputValue.password) {
            errors.password = "Это поле обязательно!";
        }
        if (!InputValue.password2) {
            errors.password = "Это поле обязательно!";
        }
        if (!isValidEmail(InputValue.email)) {
            errors.email = "Введите почту правильно!";
        }
        if (InputValue.graduate_year < new Date().getFullYear()) {
            errors.graduate_year = "Введите правильный год выпуска!";
        }
        return errors;
    };
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        return emailPattern.test(email);
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        setErrors(ValidateValue(formData));
        if (form.checkValidity() === false || errors) {
            e.stopPropagation();
        }
        if (formData.password === formData.password2 && formData.password !== "") {
            register(formData);
        } else {
            e.stopPropagation();
        }
        setValidated(true);
    };

    useEffect(() => {
        if (isError) {
            setErrors(message)
        }
        if (isSuccess && user) {
            navigate("/home")
            getUserInfo()
        }
        reset()
    }, [isError, isSuccess, user, navigate]);

    console.log(formData)
    return (
        <Layout title={"Регистрация"} content={"Странтца регистрации"}>
            <Container className={"justify-content-center align-items-center d-flex flex-column min-vh-100"}>
                <div className={"justify-content-center align-items-center fs-1 fw-bold mb-4"}>
                    <div>Регистрация</div>
                </div>
                {loading ? <Spinner animation={"border"} variant={"secondary"}/> : null }
                <Form noValidate validated={validated} onSubmit={handleSubmit}
                      className={"align-items-center justify-content-center align-self-center text-center"}
                      style={{minWidth: '38vh'}}>
                    <CSRFToken/>
                    <MainInputFields formData={formData} setFormData={setFormData} errors={errors}/>
                    <Radios formData={formData} setFormData={setFormData} errors={errors}/>
                    <Button variant="primary" type="submit"
                            className={"fw-medium rounded-4"}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
                </Form>
                <div className={"mt-3 mb-3"}>
                    <p className={"mb-0 text-center"}>
                        Уже есть аккаунт?{" "}
                        <Link to={"/login"} className={"text-primary fw-bold"}>Войти</Link>
                    </p>
                </div>
            </Container>
        </Layout>
    );
};
export default Signup
