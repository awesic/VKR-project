import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import authService from "../features/authService";

const store = (set, get) => ({
    user: {},
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
    setUser: (user) => set({user: user}),
    setLoading: (isLoading) => set({loading: isLoading}),
    setIsError: (isError) => set({isError: isError}),
    setIsSuccess: (isSuccess) => set({isSuccess: isSuccess}),
    setMessage: (message) => set({message: message}),
    login: async (userData) => {
        get().setLoading(true)
        try {
            const response = await authService.login(userData)
            if (!response.error) {
                // get().setUser(response)
                get().setIsSuccess(true)
            } else {
                get().setIsError(true)
                get().setMessage(response.error)
            }
        } catch (err) {
            get().setIsError(true)
            get().setMessage(err.message)
        }
        get().setLoading(false)
    },
    getUserInfo: async () => {
        get().setLoading(true)
        try {
            const response = await authService.getUserInfo()
            if (!response.error) {
                get().setUser(response)
                get().setIsSuccess(true)
            } else {
                get().setIsError(true)
                get().setMessage(response.error)
            }
        } catch (err) {
            get().setIsError(true)
            get().setMessage(err.message)
        }
        get().setLoading(false)
    },
    logout: async () => {
        await authService.logout()
        set({user: {}})
        localStorage.removeItem('user')
        // useStore.persist.clearStorage()
    },
    register: async (userData) => {
        get().setLoading(true)
        try {
            const response = await authService.register(userData)
            if (!response.error) {
                get().setIsSuccess(true)
                // get().setUser(response)
            } else {
                get().setIsError(true)
                get().setMessage(response.error)
            }
        } catch (err) {
            get().setIsError(true)
            get().setMessage(err.message)
        }
        get().setLoading(false)
    },
    changeStudentTheme: async (new_theme) => {
        get().setLoading(true)
        try {
            const response = await authService.changeStudentTheme(new_theme)
            if (!response.error) {
                get().setUser(response)
            } else {
                get().setIsError(true)
                get().setMessage(response.error)
            }
        } catch (err) {
            get().setIsError(true)
            get().setMessage(err.message)
        }
        get().setLoading(false)
    },
    changeStudentTeacher: async (prefer_teacher) => {
        get().setLoading(true)
        try {
            const response = await authService.changeStudentTheme(prefer_teacher)
            if (!response.error) {
                get().setUser(response)
            } else {
                get().setIsError(true)
                get().setMessage(response.error)
            }
        } catch (err) {
            get().setIsError(true)
            get().setMessage(err.message)
        }
        get().setLoading(false)
    },
    changeStudentStatus: async (status) => {
        get().setLoading(true)
        try {
            const response = await authService.changeStudentStatus(status)
            if (!response.error) {
                get().setUser(response)
            } else {
                get().setIsError(true)
                get().setMessage(response.error)
            }
        } catch (err) {
            get().setIsError(true)
            get().setMessage(err.message)
        }
        get().setLoading(false)
    },
    reset: () => {
        // get().setUser({})
        get().setLoading(false)
        get().setIsError(false)
        get().setIsSuccess(false)
        get().setMessage("")
    }
})

export const useStore = create(
    persist(devtools(store, {name: 'user'}), {name: 'user'})
)