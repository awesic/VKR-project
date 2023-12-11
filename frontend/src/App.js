import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Homepage from "containers/Homepage";
import IntroPage from "containers/IntroPage";
import Login from "containers/Login";
import Signup from "containers/Signup";
import PrivateRoute from "hocs/PrivateRoute";
import PageNotFound from "./containers/PageNotFound";

const Roles = {
    admin: "admin", student: "student", teacher: "teacher",
};

const App = () => {
    return (<>
            <Router>
                <Routes>
                    <Route path={"/"} element={<IntroPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path={"/sign-up"} element={<Signup/>}/>

                    <Route
                        path="/home"
                        element={<PrivateRoute
                            allowedRoles={[Roles.admin, Roles.student, Roles.teacher]}>
                            <Homepage/>
                        </PrivateRoute>}/>
                    <Route path={"*"} element={<PageNotFound/>}/>
                </Routes>
            </Router>
        </>
    );
};

export default App;
