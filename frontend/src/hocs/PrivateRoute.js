import React from "react";
import {Navigate, useLocation} from "react-router-dom"
import {useStore} from "../store/useStore";
import {useShallow} from "zustand/react/shallow";

const PrivateRoute = ({allowedRoles, children}) => {
    const location = useLocation();
    const user = useStore(useShallow((state)=>state.user))

    return (
        user
        && allowedRoles?.includes(user?.role?.toString().toLowerCase())
         ? children : <Navigate to={"/login"} state={{from: location}}/>
    );
};
export default PrivateRoute