import React, {Fragment, lazy} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";

import LazyLayout from "./hocs/LazyLayout";
import Loading from "./containers/Loading";

const Homepage = lazy(() => import("./containers/Homepage"))
const IntroPage = lazy(() => import("./containers/IntroPage"))
const Login = lazy(() => import("./containers/Login"))
const Signup = lazy(() => import("./containers/Signup"))
const PrivateRoute = lazy(() => import("./hocs/PrivateRoute"))
const PageNotFound = lazy(() => import("./containers/PageNotFound"))
const ChooseStudentsPage = lazy(() => import("./containers/teacher/ChooseStudentsPage"))
const StudentsListPage = lazy(() => import("./containers/teacher/StudentsListPage"))

const Roles = {
    admin: "admin", student: "student", teacher: "teacher",
};

function App () {
    return (<>
        <Router>
            <Routes>
                <Route path={"/"} element={<LazyLayout/>}>
                    {/*<Route path={"loading"} element={<Loading/>}/>*/}
                    <Route index element={<IntroPage/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path={"sign-up"} element={<Signup/>}/>

                    <Route element={<PrivateRoute allowedRoles={[Roles.admin, Roles.student, Roles.teacher]}/>}>
                        <Route path={"home"} element={<Homepage/>}/>
                    </Route>
                    <Route path={"teacher"} element={<PrivateRoute allowedRoles={[Roles.teacher]}/>}>
                        <Route path={"choose-student"} element={<ChooseStudentsPage/>}/>
                        <Route path={"students-list"} element={<StudentsListPage/>}/>
                    </Route>

                    <Route path={"*"} element={<PageNotFound/>}/>
                </Route>
            </Routes>
        </Router>
    </>);
};

export default App
