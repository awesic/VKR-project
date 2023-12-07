// import {
//     LOGIN_FAIL,
//     LOGIN_SUCCESS,
//     LOGOUT_FAIL,
//     LOGOUT_SUCCESS,
//     REGISTER_FAIL,
//     REGISTER_SUCCESS,
//     AUTHENTICATED_SUCCESS,
//     AUTHENTICATED_FAIL
// } from "../actions/types";
//
// const initialState = {
//     isAuthenticated: false
// };
//
// export default function(state = initialState, action) {
//     const {type, payload} = action;
//
//     switch (type) {
//         case AUTHENTICATED_SUCCESS:
//         case AUTHENTICATED_FAIL:
//             return {
//                 ...state,
//                 isAuthenticated: payload
//             }
//         case REGISTER_SUCCESS:
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isAuthenticated: true
//             }
//         case LOGOUT_SUCCESS:
//             return {
//                 ...state,
//                 isAuthenticated: false
//             }
//         case REGISTER_FAIL:
//         case LOGIN_FAIL:
//         case LOGOUT_FAIL:
//             return state
//         default:
//             return state
//     }
// };