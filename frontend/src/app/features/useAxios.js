import axios from "axios";
import Cookie from "js-cookie";

export const axiosPublic = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    },
    withCredentials: true,
})

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'X-CSRFToken': Cookie.get('csrftoken')
    },
    withCredentials: true,
})
