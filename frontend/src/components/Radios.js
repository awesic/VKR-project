import {Form} from "react-bootstrap";
import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_DOMAIN} from "../features/authService";

const Radios = ({formData, setFormData, errors}) => {
    const student = "student";
    const admin = "admin";
    const teacher = "teacher";
    const currentYear = new Date().getFullYear()
    const [role, setRole] = useState("")
    const [institutes, setInstitutes] = useState([]);
    const [directions, setDirections] = useState([]);

    const onRadioChange = (e) => {
        setRole(e.target.value);

        if (role === student) {
            formData.institute = '';
            formData.direction = '';
            formData.graduate_year = currentYear;
            // formData.role = student;
        }
        if (role === teacher) {
            formData.institute = '';
            formData.direction = '';
            // formData.role = teacher;
        }
        if (role === admin) {
            setFormData({
                first_name: "",
                last_name: "",
                patronymic: "",
                email: "",
                password: "",
                password2: "",
                role: admin
            })
        }
    }
    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        formData.role = role
    };

    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const response = await axios.get(`${BACKEND_DOMAIN}/api/v1/institute/`)
                setInstitutes(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchDirections = async () => {
            try {
                const response = await axios.get(`${BACKEND_DOMAIN}/api/v1/directions/`)
                setDirections(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchInstitutes()

        fetchDirections()
    }, []);

    return (
        <Fragment>
            <Form.Group className={"mb-3 text-start"}>
                <Form.Check
                    required
                    type={"radio"}
                    value={student}
                    name={"role"}
                    id={student}
                    checked={role === student}
                    onChange={onRadioChange}
                    label={"Студент"}/>
                <Form.Check
                    type={"radio"}
                    value={teacher}
                    name={"role"}
                    id={teacher}
                    checked={role === teacher}
                    onChange={onRadioChange}
                    label={"Преподаватель"}/>
                <Form.Check
                    type={"radio"}
                    value={admin}
                    name={"role"}
                    id={admin}
                    checked={role === admin}
                    onChange={onRadioChange}
                    label={"Админ"}/>
            </Form.Group>
            {(role === student || role === teacher) && (
                <Fragment>
                    <Form.Group className={"mb-3"}>
                        <Form.Select
                            required
                            name={"institute"}
                            // type={"text"}
                            placeholder={"Институт*"}
                            value={formData.institute}
                            onChange={e => onChange(e)}
                            className={"rounded-3"}
                            list={"instituteOptions"}>
                            <option>Институт*...</option>
                            {institutes.map((institute) => (
                                <option value={institute.short_name}>{institute.short_name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                            Это поле обязательно.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Select
                            required
                            name={"direction"}
                            type={"text"} placeholder={"Направление*"}
                            value={formData.direction}
                            onChange={e => onChange(e)}
                            className={"rounded-3"}>

                            <option>Направление*...</option>
                            {directions.map((direction) => (
                                <option value={direction.code}>{direction.code} - {direction.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                            Это поле обязательно.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Fragment>
            )}

            {role === student && (
                <Form.Group className={"mb-3 text-start"}>
                    <Form.Label>Год выпуска*</Form.Label>
                    <Form.Control
                        required
                        name={"graduate_year"}
                        type={"number"}
                        defaultValue={currentYear}
                        value={formData.graduate_year}
                        onChange={e => onChange(e)}
                        isInvalid={!!errors.graduate_year}
                        className={"rounded-3"}/>
                    <Form.Control.Feedback type={"invalid"} className={"text-start"}>
                        {errors.graduate_year ? errors.graduate_year : "Это поле обязательно."}
                    </Form.Control.Feedback>
                </Form.Group>
            )}
        </Fragment>
    );
};
export default Radios;