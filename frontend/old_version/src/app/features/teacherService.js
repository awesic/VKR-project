import {axiosPrivate} from "./useAxios";

// const getAllTeachersStudents = async () => {
//     const response =
//     return response
// }

const approveStudent = async (student_email) => {
    const body = {
        teacher_approved: true
    }
    // const response =
    // return response.data
}

const teacherService = {
    approveStudent,
}
export default teacherService