import axios from "axios";
import Cookie from "js-cookie";
import {LOAD_USER_PROFILE_FAIL, LOAD_USER_PROFILE_SUCCESS} from "./types";

export const load_user = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFToken': Cookie.get('csrftoken')
        }
    };
    try {
        const response = await axios.get("/api/v1/account/profile", config)
        if (response.data.error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL
            })
        } else {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: response.data
            })
        }
    } catch (e) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL
        })
    }
}