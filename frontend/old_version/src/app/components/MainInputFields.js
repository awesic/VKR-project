import React, {Fragment, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";

const MainInputFields = ({formData, setFormData, errors}) => {
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    return (
        <Fragment>
            <Form.Group className={"mb-3"}>
                <Form.Control
                    required
                    name={"first_name"}
                    type={"text"} placeholder={"Имя*"}
                    value={formData.first_name}
                    onChange={e => onChange(e)}
                    className={"rounded-3"}/>
                <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                    Это поле обязательно.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={"mb-3"}>
                <Form.Control
                    required
                    name={"last_name"}
                    type={"text"} placeholder={"Фамилия*"}
                    value={formData.last_name}
                    onChange={e => onChange(e)}
                    className={"rounded-3"}/>
                <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                    Это поле обязательно.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={"mb-3"}>
                <Form.Control
                    required={false}
                    name={"patronymic"}
                    type={"text"} placeholder={"Отчество"}
                    value={formData.patronymic}
                    onChange={e => onChange(e)}
                    className={"rounded-3"}/>
                <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                    Это поле обязательно.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Control
                    required
                    name={"email"}
                    type="email" placeholder="Введите почту*"
                    value={formData.email}
                    onChange={e => onChange(e)}
                    className={"rounded-3"}/>
                <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                    {errors.email ? errors.email : "Это поле обязательно."}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <InputGroup>
                    <Form.Control
                    required
                    name={"password"}
                    type={showPassword ? "text" : "password"} placeholder="Пароль*"
                    value={formData.password}
                    onChange={e => onChange(e)}
                    isInvalid={!!errors.password}
                    className={"rounded-start-3"}/>
                    <InputGroup.Text onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ?
                            <i className="fa-regular fa-eye-slash" style={{color: "#000000"}}/>
                            : <i className="fa-regular fa-eye" style={{color: "#000000"}}/>}
                    </InputGroup.Text>
                </InputGroup>

                <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                    {errors.password ? errors.password : "Это поле обязательно."}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={"mb-3"}>
                <Form.Control
                    required
                    name={"password2"}
                    type="password" placeholder="Подтвердите пароль*"
                    value={formData.password2}
                    onChange={e => onChange(e)}
                    isInvalid={!!errors.password}
                    className={"rounded-3"}/>
                <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                    {errors.password ? errors.password : "Это поле обязательно."}
                </Form.Control.Feedback>
            </Form.Group>
        </Fragment>
    )
};
export default MainInputFields;