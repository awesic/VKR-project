import axios from "axios";
import {axiosPublic} from "./useAxios";

export const BACKEND_DOMAIN = process.env.API_URL

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/register`
const TOKEN_GET_URL = `${BACKEND_DOMAIN}/api/v1/token`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/login`
const LOGOUT_URL = `${BACKEND_DOMAIN}/api/v1/auth/logout`
const TOKEN_REFRESH_URL = `${BACKEND_DOMAIN}/api/v1/token/refresh`
const USER_PROFILE_URL = `${BACKEND_DOMAIN}/api/v1/account/profile`
const CHANGE_THEME_URL = `${BACKEND_DOMAIN}/api/v1/student/change/`
const CHANGE_TEACHER_URL = `${BACKEND_DOMAIN}/api/v1/student/change/`

const register = async (userData) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    }
    const response = await axios.post(REGISTER_URL, userData, config)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    }

    const response = await axios.post(LOGIN_URL, userData, config)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

const logout = async (accessToken, refreshToken) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `JWT ${accessToken}`
        }
    }
    const body = JSON.stringify({
        'refresh': `${refreshToken}`
    })
    localStorage.removeItem("user")
    localStorage.removeItem("userInfo")
    await axios.post(LOGOUT_URL, body, config)
}

// const refreshToken = async (refreshToken) => {
//     const body = JSON.stringify({
//         'refresh': `${refreshToken}`
//     })
//     const response = await axiosPublic('/token/refresh/', body)
// }

const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `JWT ${accessToken}`
        }
    }
    const response = await axios.get(USER_PROFILE_URL, config)

    if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data))
    }

    return response.data
}

const changeStudentTheme = async (accessToken, new_theme) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Authorization": `JWT ${accessToken}`
        }
    }
    const response = await axios.put(CHANGE_THEME_URL, new_theme, config)

    if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data))
    }
    return response.data
}

const changeStudentTeacher = async (accessToken, prefer_teacher) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Authorization": `JWT ${accessToken}`
        }
    }
    const response = await axios.put(CHANGE_THEME_URL, prefer_teacher, config)

    if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data))
    }
    return response.data
}

const authService = {register, login, logout, getUserInfo, changeStudentTheme, changeStudentTeacher}

export default authService