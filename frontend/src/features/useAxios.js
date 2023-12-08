import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {BACKEND_DOMAIN} from "./authService";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import {getUserInfo} from "./authSlice";
import {store} from "../store";

const baseURL = BACKEND_DOMAIN

export const axiosPublic = axios.create({
    baseURL,
})

export const axiosPrivate = axios.create({
    baseURL,
})

axiosPrivate.interceptors.request.use(
    async (config) => {
        const user = store?.getState()?.user?.user

        if (user?.access) {
            const decodedToken = jwtDecode(user?.access)
            const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1
            if (isExpired) {
                await store.dispatch(refresh)
            }
        }
    }
)


const useAxios = () => {
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const axiosInstance = axios.create({
        baseURL,
        headers: {'Authorization': `JWT ${user?.access}`}
    })

    axiosInstance.interceptors.request.use(async req => {
        const authToken = jwtDecode(user.access)
        const isExpires = dayjs.unix(authToken.exp).diff(dayjs()) < 1

        if (!isExpires) return req

        const response = await axios.post(`${baseURL}/api/v1/token/refresh/`, {
            refresh: user.refresh
        })

        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch(getUserInfo())
    })
}