import {Form} from "react-bootstrap";
import React, {Fragment} from "react";

const Radios = ({formData, setFormData, errors, role, setRole}) => {
    const student = "student";
    const admin = "admin";
    const teacher = "teacher";
    const currentYear = new Date().getFullYear()

    const onRadioChange = (e) => {
        setRole(e.target.value);
        if (role === student) {
            formData.institute = '';
            formData.direction = '';
            formData.graduate_year = currentYear;
        }
        if (role === teacher) {
            formData.institute = '';
            formData.direction = '';
        }
        if (role === admin) {
            setFormData({
                first_name: "",
                last_name: "",
                patronymic: "",
                email: "",
                password: "",
                password2: ""
            })
        }
    }
    const onChange = (e) => {
        e.preventDefault();
        // setErrors(ValidateValue(FormData));
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };
    // Функция для обновления formData
    const updateFormData = (name, value) => {
        // Создание нового объекта formData с добавленным или обновленным параметром
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    // Функция для удаления параметра из formData
    const removeParamFromFormData = (paramName) => {
        // Создание нового объекта formData без указанного параметра
        const {[paramName]: removedParam, ...rest} = formData;
        setFormData(rest);
    };

    return (
        <Fragment>
            <Form.Group className={"mb-3 text-start"} onChange={onRadioChange}>
                <Form.Check
                    required
                    type={"radio"}
                    value={student}
                    name={"roleChoose"}
                    id={"checkedStudent"}
                    label={"Студент"}/>
                <Form.Check
                    type={"radio"}
                    value={teacher}
                    name={"roleChoose"}
                    id={"checkedTeacher"}
                    label={"Преподаватель"}/>
                <Form.Check
                    type={"radio"}
                    value={admin}
                    name={"roleChoose"}
                    id={"checkedAdmin"}
                    label={"Админ"}/>
            </Form.Group>
            {role === student && (
                <Fragment>
                    <Form.Group className={"mb-3"}>
                        <Form.Control
                            required
                            name={"institute"}
                            type={"text"} placeholder={"Институт*"}
                            value={formData.institute}
                            onChange={e => onChange(e)}
                            className={"rounded-3"}/>
                        <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                            Это поле обязательно.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Control
                            required
                            name={"direction"}
                            type={"text"} placeholder={"Направление*"}
                            value={formData.direction}
                            onChange={e => onChange(e)}
                            className={"rounded-3"}/>
                        <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                            Это поле обязательно.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"mb-3 text-start"}>
                        <Form.Label>Год выпуска*</Form.Label>
                        <Form.Control
                            required
                            name={"graduate_year"}
                            type={"number"}
                            // placeholder={"Год выпуска*"}
                            defaultValue={currentYear}
                            value={formData.graduate_year}
                            onChange={e => onChange(e)}
                            isInvalid={!!errors.graduate_year}
                            className={"rounded-3"}/>
                        <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                            {errors.graduate_year ? errors.graduate_year : "Это поле обязательно."}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Fragment>
            )}
            {role === teacher && (
                <Fragment>
                    <Form.Group className={"mb-3"}>
                        <Form.Control
                            required
                            name={"institute"}
                            type={"text"} placeholder={"Институт*"}
                            value={formData.institute}
                            onChange={e => onChange(e)}
                            className={"rounded-3"}/>
                        <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                            Это поле обязательно.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Control
                            required
                            name={"specialization"}
                            type={"text"} placeholder={"Направление*"}
                            value={formData.direction}
                            onChange={e => onChange(e)}
                            className={"rounded-3"}/>
                        <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                            Это поле обязательно.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Fragment>
            )}
        </Fragment>
    );
};
export default Radios;