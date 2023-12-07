// import {LOAD_USER_PROFILE_FAIL, LOAD_USER_PROFILE_SUCCESS} from "../actions/types";
//
// const initialState = {
//     profile: {}
// }
//
// export default function (state = initialState, action) {
//     const {type, payload} = action
//
//     switch (type) {
//         case LOAD_USER_PROFILE_SUCCESS:
//             return {
//                 ...state,
//                 profile: payload
//             }
//         case LOAD_USER_PROFILE_FAIL:
//             return {
//                 ...state,
//                 profile: {}
//             }
//         default:
//             return state
//     }
// }