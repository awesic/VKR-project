import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom"
import {useSelector} from "react-redux";
// import {connect} from "react-redux";

const PrivateRoute = ({allowedRoles, children}) => {
    const location = useLocation();
    const {userInfo} = useSelector((state) => state.user)
    console.log(userInfo)
    return (
        userInfo
        && allowedRoles?.includes(userInfo?.role?.toString().toLowerCase())
         ? children : <Navigate to={"/login"} state={{from: location}}/>
    );
};
export default PrivateRoute
// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     roles: [state.profile.profile.role]
// });
//
// export default connect(mapStateToProps, {})(PrivateRoute);