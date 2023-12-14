import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom"
import {useStore} from "../store/useStore";
import {useShallow} from "zustand/react/shallow";

const PrivateRoute = ({allowedRoles}) => {
    const location = useLocation();
    const user = useStore(useShallow((state)=>state.user))

    return (
        user
        && allowedRoles?.includes(user?.role?.toString().toLowerCase())
         ? <Outlet/> : <Navigate to={"/login"} state={{from: location}}/>
    );
};
export default PrivateRoute