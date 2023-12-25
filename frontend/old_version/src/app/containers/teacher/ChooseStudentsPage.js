import Layout from "../../hocs/Layout";
import Navbars from "../../components/Navbars";
import {Button, Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {axiosPrivate} from "../../features/useAxios";
import {useTeachersStore} from "../../store/useTeachersStore";

const ChooseStudentsPage = () => {
    const [studentsList, setStudentsList] = useState([])

    const approveStudent = useTeachersStore(state => state.approveStudent)
    const reset = useTeachersStore(state => state.reset)
    const fetchAllTeachersStudents = useTeachersStore(state => state.fetchAllTeachersStudents)

    useEffect(() => {
        const fetchStudentsList = async () => {
            if (studentsList.length === 0) {
                try {
                    const response = await axiosPrivate.get('/api/v1/teacher/students-choose-list/?teacher_approved=False')
                    setStudentsList(response.data)
                    // return response.data
                } catch (err) {
                    console.log(err)
                }
            }
        }
        fetchStudentsList()
        fetchAllTeachersStudents()
    }, []);

    const onButtonAddStudent = async (student_email) => {
        await approveStudent(student_email)
        reset()
        window.location.reload()
    }

    return (<>
            <Layout title={"Выбор студентов"} content={"Страница утверждения науч. рук."}>
                <Navbars/>
                <Container className={"py-5"}>
                    <h4 className={"mb-4"}>Список студентов, которые выбрали Вас</h4>
                    <Table hover responsive={"sm"} className={"mt-4"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Почта</th>
                            <th scope={"col"}>ФИО</th>
                            <th scope={"col"}>Группа</th>
                            <th scope={"col"}>Год выпуска</th>
                            <th scope={"col"}>Действия</th>
                        </tr>
                        </thead>

                        {studentsList && (
                            <tbody className="table-group-divider">
                            {studentsList.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.email}</td>
                                    <td>{student.last_name} {student.first_name} {student.patronymic.charAt(0)}</td>
                                    <td>{student.group}</td>
                                    <td>{student.graduate_year}</td>
                                    <td><Button size={"sm"}
                                                onClick={() => onButtonAddStudent(student.email)}>Принять</Button>
                                    </td>
                                </tr>))}
                            </tbody>
                        )}
                    </Table>
                    {studentsList.length === 0 && (
                        <div className={"d-flex justify-content-center w-100"}>
                            <h6 className={"mt-4"}>Список пуст</h6>
                        </div>
                    )}
                </Container>
            </Layout>
    </>)
}
export default ChooseStudentsPage