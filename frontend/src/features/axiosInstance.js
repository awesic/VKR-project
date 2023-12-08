import {BACKEND_DOMAIN} from "./authService";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";

const baseURL = BACKEND_DOMAIN
let authTokens = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const axiosInstance = axios.create({
    baseURL,
    headers: {'Authorization': `JWT ${authTokens?.access}`}
})

axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) {
        authTokens = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        req.headers.Authorization = `JWT ${authTokens?.access}`
    }

    const user = jwtDecode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (!isExpired) return req

    const response = await axios.post(`${baseURL}/api/v1/token/refresh/`, {
        refresh: authTokens.refresh
    })

    localStorage.setItem('user', JSON.stringify(response.data))
    req.headers.Authorization = `JWT ${authTokens?.access}`
    return req
})
export default axiosInstance