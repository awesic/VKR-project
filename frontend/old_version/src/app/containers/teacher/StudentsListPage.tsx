import * as React from "react"
import Layout from "../../hocs/Layout";
import Navbars from "../../components/Navbars";
import {Container} from "react-bootstrap";
import {useTeachersStore} from "../../store/useTeachersStore";
import {useShallow} from "zustand/react/shallow";
import {columns} from "../../components/ListDataTable/columns";
import {DataTable} from "../../components/ListDataTable/data-table";

const StudentsListPage = () => {
    const students = useTeachersStore(
        useShallow((state) => state.students))

    return (
        <>
            <Layout title={"Список студентов"} content={"Страница списка студентов"}>
                <Navbars/>
                <Container className={"py-5"}>
                    <h4 className={"mb-4"}>Список студентов, которых Вы выбрали</h4>
                    {/*<Table hover responsive={"sm"} className={"mt-4"}>*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th scope={"col"}>Почта</th>*/}
                    {/*        <th scope={"col"}>ФИО</th>*/}
                    {/*        <th scope={"col"}>Группа</th>*/}
                    {/*        <th scope={"col"}>Год выпуска</th>*/}
                    {/*        <th scope={"col"}>Этап выполнения</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    
                    {/*    {students && (*/}
                    {/*        <tbody className="table-group-divider">*/}
                    {/*        {students.map((student, index) => (*/}
                    {/*            <tr key={index}>*/}
                    {/*                <td>{student.email}</td>*/}
                    {/*                <td>{student.last_name} {student.first_name} {student.patronymic.charAt(0)}</td>*/}
                    {/*                <td>{student.group}</td>*/}
                    {/*                <td>{student.graduate_year}</td>*/}
                    {/*                <td>{student.status_name}</td>*/}
                    {/*            </tr>))}*/}
                    {/*        </tbody>*/}
                    {/*    )}*/}
                    {/*</Table>*/}
                    {/*{students.length === 0 && (*/}
                    {/*    <div className={"d-flex justify-content-center w-100"}>*/}
                    {/*        <h6 className={"mt-4"}>Список пуст</h6>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    <DataTable columns={columns} data={students}/>
                </Container>
            </Layout>
        </>)
}
export default StudentsListPage