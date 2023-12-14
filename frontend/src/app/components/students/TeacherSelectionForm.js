import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {axiosPublic} from "../../features/useAxios";

const TeacherSelectionForm = ({selectedTeacher, onSelectedTeacher}) => {
    const [teacherList, setTeacherList] = useState([])

    useEffect(() => {
        const fetchTeachers = async () => {
            if (teacherList.length === 0) {
                try {
                    const response = await axiosPublic.get('/api/v1/teachers/')
                    setTeacherList(response.data)
                } catch (error) {
                    console.log(error)
                }
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
                className={"rounded-3"}>
                <option value={""}>Выберите науч. рук.</option>
                {teacherList.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                        {teacher.email} / {teacher.last_name} {teacher.first_name} {teacher.patronymic}
                    </option>
                ))}
            </Form.Select>
        </>
    )
}
export default TeacherSelectionForm