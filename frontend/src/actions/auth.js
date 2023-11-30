import axios from "axios";
import Cookie from 'js-cookie'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL, AUTHENTICATED_FAIL, AUTHENTICATED_SUCCESS
} from "./types";
import {load_user} from "./profile";

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };
    try {
        const response = await axios.get("/api/v1/auth/is_authenticated", config)
        if (response.data.isAuthenticated === true) {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            });
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
};

export const register = (formData, role) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'X-CSRFToken': Cookie.get('csrftoken')
        }
    };
    let url = "/api/v1/auth/admin/register";
    const {
        first_name,
        last_name,
        patronymic,
        email,
        password,
        password2,
        institute,
        direction,
        graduate_year,
    } = formData;

    let body = JSON.stringify({
        email, password, password2, first_name, last_name, patronymic,
    });

    if (role === "student") {
        url = "/api/v1/auth/student/register";
        body = JSON.stringify({
            email, password, password2, first_name, last_name, patronymic, institute, direction, graduate_year,
        });
    }
    if (role === "teacher") {
        url = "/api/v1/auth/teacher/register";
        body = JSON.stringify({
            email, password, password2, first_name, last_name, patronymic, institute, direction,
        });
    }

    try {
        const response = await axios.post(url, body, config);
        if (response.data.error) {
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS
            });
            dispatch(load_user());
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'X-CSRFToken': Cookie.get('csrftoken')
        }
    };
    const body = JSON.stringify({ email, password });

    try {
        const response = await axios.post("/api/v1/auth/login", body, config);
        if (response.data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'X-CSRFToken': Cookie.get('csrftoken')
        }
    };
    const body = JSON.stringify({
        'withCredentials': true
    });
    try {
        const response = await axios.post("/api/v1/auth/logout", body, config);
        if (response.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
}