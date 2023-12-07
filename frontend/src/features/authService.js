import axios from "axios";

export const BACKEND_DOMAIN = 'http://localhost:8000'

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/register`
// const STUDENT_REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/student/register`
// const TEACHER_REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/teacher/register`
const TOKEN_GET_URL = `${BACKEND_DOMAIN}/api/v1/token`
const TOKEN_REFRESH_URL = `${BACKEND_DOMAIN}/api/v1/token/refresh`
const USER_PROFILE_URL = `${BACKEND_DOMAIN}/api/v1/account/profile`

const register = async (userData) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    }
    // let url = REGISTER_URL
    // const {
    //     first_name,
    //     last_name,
    //     patronymic,
    //     email,
    //     password,
    //     password2,
    //     institute,
    //     direction,
    //     graduate_year,
    //     role,
    // } = userData
    //
    // let body = JSON.stringify({
    //     email, password, password2, first_name, last_name, patronymic,
    // });
    //
    // if (role === "student") {
    //     url = STUDENT_REGISTER_URL
    //     body = JSON.stringify({
    //         email, password, password2, first_name, last_name, patronymic, institute, direction, graduate_year,
    //     });
    // } else if (role === "teacher") {
    //     url = TEACHER_REGISTER_URL
    //     body = JSON.stringify({
    //         email, password, password2, first_name, last_name, patronymic, institute, direction,
    //     });
    // }
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

    const response = await axios.post(TOKEN_GET_URL, userData, config)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userInfo")
}

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

const authService = {register, login, logout, getUserInfo}

export default authService