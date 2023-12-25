import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import teacherService from "../features/teacherService";
import {immer} from "zustand/middleware/immer";
import {axiosPrivate} from "../features/useAxios";

const store = (set, get) => ({
    students: [],
    isError: false,
    isSuccess: false,
    message: "",
    setIsError: (is_error) => set({isError: is_error}),
    setIsSuccess: (is_error) => set({isError: is_error}),
    setMessage: (message) => set({message: message}),
    fetchAllTeachersStudents: async () => {
        try {
            const response = await axiosPrivate.get(
                '/api/v1/teacher/students-choose-list/?teacher_approved=True')
            if (!response.error) {
                set((state) => {state.students = response.data})
            }
        } catch (err) {
            get().setIsError(true)
            get().setMessage(err.message)
        }
    },
    approveStudent: async (stud_email) => {
        try {
            const response = await axiosPrivate.put(
                `/api/v1/teacher/student/${stud_email}/change/`, {
                teacher_approved: true,
            })
            if (!response.error) {
                // get().addStudent(response.data)
                set((state) => {state.students.push(response)})
            }
        } catch (error) {
            get().setIsError(true)
            get().setMessage(error.message)
        }
    },
    reset: () => {
        // get().setUser({})
        // get().setLoading(false)
        get().setIsError(false)
        get().setIsSuccess(false)
        get().setMessage("")
    }
})

export const useTeachersStore = create(
    persist(devtools(
        immer(store),
        {name: 'teachers_store'}),
        {name: 'teachers_store'})
)