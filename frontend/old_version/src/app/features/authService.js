import {axiosPrivate, axiosPublic} from "./useAxios";
import Cookie from 'js-cookie'
import {useTeachersStore} from "../store/useTeachersStore";
import {useStore} from "../store/useStore";

export const BACKEND_DOMAIN = 'http://localhost:8000'

const REGISTER_URL = '/api/v1/auth/register'
const TOKEN_GET_URL = `${BACKEND_DOMAIN}/api/v1/token`
const LOGIN_URL = '/api/v1/auth/login'
const LOGOUT_URL = '/api/v1/auth/logout'
const TOKEN_REFRESH_URL = '/api/v1/token/refresh/'
const USER_PROFILE_URL = '/api/v1/account/profile'
const CHANGE_THEME_URL = '/api/v1/student/change/'
const CHANGE_TEACHER_URL = '/api/v1/student/change/'

const register = async (userData) => {

    const response = await axiosPrivate.post(REGISTER_URL, userData)

    return response.data
}

const login = async (userData) => {

    const response = await axiosPrivate.post(LOGIN_URL, userData)

    return response.data
}

const logout = async () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'X-CSRFToken': Cookie.get('csrftoken')
        }
    }
    const body = {
        withCredentials: true
    }
    await axiosPublic.post(LOGOUT_URL, body, config)
    // localStorage.removeItem('user')
    localStorage.removeItem('teachers_store')
    // useTeachersStore.persist.clearStorage()
    // useStore.persist.clearStorage()
}

const getUserInfo = async () => {

    const response = await axiosPublic.get(USER_PROFILE_URL)

    return response.data
}

const changeStudentTheme = async (new_theme) => {

    const response = await axiosPrivate.put(CHANGE_THEME_URL, new_theme)
    return response.data
}

const changeStudentTeacher = async (prefer_teacher) => {

    const response = await axiosPrivate.put(CHANGE_THEME_URL, prefer_teacher)
    return response.data
}

const changeStudentStatus = async (status) => {

    const response = await axiosPrivate.put(CHANGE_THEME_URL, status)
    return response.data
}

const authService = {
    register, login, logout, getUserInfo,
    changeStudentTheme, changeStudentTeacher, changeStudentStatus
}

export default authService