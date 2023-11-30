import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom"
import {connect} from "react-redux";

const PrivateRoute = ({isAuthenticated, allowedRoles, roles}) => {
    const location = useLocation();
    console.log(roles)
    console.log(roles.find(role => allowedRoles.includes(role)))

    return (
        isAuthenticated
        && roles?.find(role => allowedRoles?.includes(role))
         ? <Outlet/> : <Navigate to={"/login"} state={{ from: location }} replace/>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    roles: [state.profile.profile.role]
});

export default connect(mapStateToProps, {})(PrivateRoute);