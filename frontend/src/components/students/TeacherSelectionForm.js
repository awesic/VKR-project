import React, {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_DOMAIN} from "../../features/authService";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";

const TeacherSelectionForm = ({selectedTeacher, onSelectedTeacher}) => {
    const [teacherList, setTeacherList] = useState([])
    const {user} = useSelector((state) => state.user)

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const config = {
                    headers: {
                        "Authorization": `JWT ${user.access}`
                    }
                }
                const response = await axios.get(`${BACKEND_DOMAIN}/api/v1/teachers/`, config)
                setTeacherList(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTeachers()
    }, []);
    return (
        <>
            <Form.Select
                id={"teacher"}
                name={"teacher"}
                value={selectedTeacher}
                onChange={e => onSelectedTeacher(e.target.value, teacherList.filter(function (tch, i) {
                    if (tch.id === e.target.value) {
                        return `${tch.last_name} ${tch.first_name} ${tch.patronymic}`
                    } else {
                        return ""
                    }
                }))}
                className={"rounded-3"}
                list={"instituteOptions"}>
                <option value={""}>Выберите преподавателя</option>
                {teacherList.map((teacher) => (
                    <option id={teacher.id} value={teacher.id}>
                        {teacher.email} / {teacher.last_name} {teacher.first_name} {teacher.patronymic}
                    </option>
                ))}
            </Form.Select>
        </>
    )
}
export default TeacherSelectionForm