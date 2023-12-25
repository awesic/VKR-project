import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { axiosPrivate } from "@/features/useAxios";
import { TeacherStore } from "@/data/types/storeTypes";
import { getErrorMessage } from "@/data/helpers";

export const useTeachersStore = create<TeacherStore>()(
    immer(
        persist(
            (set, get) => ({
                students: [],
                isError: false,
                isSuccess: false,
                message: "",
                setIsError: (isError) => set({ isError: isError }),
                setIsSuccess: (isSuccess) => set({ isSuccess: isSuccess }),
                setMessage: (message) => set({ message: message }),
                fetchAllTeachersStudents: async () => {
                    try {
                        const response = await axiosPrivate.get(
                            "/api/v1/teacher/students-choose-list/?teacher_approved=True"
                        );
                        if (!response.data.error) {
                            set((state) => {
                                state.students = response.data;
                            });
                        }
                    } catch (error) {
                        get().setIsError(true);
                        get().setMessage(getErrorMessage(error));
                    }
                },
                // fetchAllStudents: async () => {
                //     try {
                //         const response = await axiosPrivate.get(
                //             "/api/v1/teacher/students-choose-list/"
                //         );
                //         if (!response.data.error) {
                //             set((state) => {
                //                 state.students = response.data;
                //             });
                //         }
                //     } catch (error) {
                //         get().setIsError(true);
                //         get().setMessage(getErrorMessage(error));
                //     }
                // },
                approveStudent: async (studentEmail) => {
                    try {
                        const response = await axiosPrivate.put(
                            `/api/v1/teacher/student/${studentEmail}/change/`,
                            {
                                teacher_approved: true,
                            }
                        );
                        if (!response.data.error) {
                            const { students } = get();
                            set({ students: [response.data].concat(students) });
                        }
                    } catch (error) {
                        get().setIsError(true);
                        get().setMessage(getErrorMessage(error));
                    }
                },
                approveTheme: async (studentEmail) => {
                    try {
                        const response = await axiosPrivate.put(
                            `/api/v1/teacher/student/${studentEmail}/change/`,
                            {
                                theme_approved: true,
                            }
                        );
                        if (!response.data.error) {
                            const { students } = get();
                            set({
                                students: students.map((student) => ({
                                    ...student,
                                    theme_appoved:
                                        student.email === studentEmail
                                            ? true
                                            : student.theme_approved,
                                })),
                            });
                        }
                    } catch (error) {
                        get().setIsError(true);
                        get().setMessage(getErrorMessage(error));
                    }
                },
                reset: () => {
                    // get().setUser({})
                    // get().setLoading(false)
                    get().setIsError(false);
                    get().setIsSuccess(false);
                    get().setMessage("");
                },
            }),
            {
                name: "teacherStore",
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);
