import {register} from "../actions/auth";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Container, Form} from "react-bootstrap";
import MainInputFields from "../components/MainInputFields";
import Radios from "../components/Radios";
import CSRFToken from "../components/CSRFToken";

const Signup = ({register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        patronymic: "",
        email: "",
        password: "",
        password2: "",
        // institute: "",
        // specialization: "",
        graduate_year: new Date().getFullYear()
    });
    const [created, setCreated] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState("");
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
    // const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        setErrors(ValidateValue(formData));
        if (form.checkValidity() === false || errors) {
            e.stopPropagation();
        }
        if (formData.password === formData.password2 && formData.password !== "") {
            const registerUser = async () => {
                await register(formData, role);
                setCreated(true);
            }
            registerUser();
        } else {
            e.stopPropagation();
        }
        setValidated(true);
    };

    if (isAuthenticated) {
        return <Navigate to={"/home"} />;
    } else if (created) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <Container className={"justify-content-center align-items-center d-flex flex-column min-vh-100"}>
            <div className={"justify-content-center align-items-center fs-1 fw-bold mb-4"}>
                <div>Регистрация</div>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}
                  className={"align-items-center justify-content-center align-self-center text-center"}
                  style={{minWidth: '38vh'}}>
                <CSRFToken />
                <MainInputFields formData={formData} setFormData={setFormData} errors={errors}/>
                <Radios formData={formData} setFormData={setFormData} errors={errors} role={role} setRole={setRole}/>
                <Button variant="primary" type="submit" className={"fw-medium rounded-4"}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
            </Form>
            <div className={"mt-3 mb-3"}>
                <p className={"mb-0 text-center"}>
                    Уже есть аккаунт?{" "}
                    <a href={"/login"} className={"text-primary fw-bold"}>Войти</a>
                </p>
            </div>
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {register})(Signup);