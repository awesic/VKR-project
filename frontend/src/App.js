import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import {Provider} from "react-redux";
import {store} from "store";
import Homepage from "containers/Homepage";
import IntroPage from "containers/IntroPage";
import Login from "containers/Login";
import Layout from "hocs/Layout";
import Signup from "containers/Signup";
import PrivateRoute from "hocs/PrivateRoute";
import StudDashboard from "containers/student/StudDashboard";
import PageNotFound from "./containers/PageNotFound";

const Roles = {
    admin: "admin", student: "student", teacher: "teacher",
};

const App = () => {
    return (<>
            <Router>
                {/* <Layout> */}
                <Routes>
                    {/*<Route  path="/" element={<IntroPage />}>*/}
                    {/*public routes*/}
                    <Route path={"/"} element={<IntroPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path={"/sign-up"} element={<Signup/>}/>

                    <Route
                        path="/home"
                        element={<PrivateRoute
                            allowedRoles={[Roles.admin, Roles.student, Roles.teacher]}>
                            <Homepage/>
                        </PrivateRoute>}
                    />

                    <Route path="/student/dashboard"
                           element={<PrivateRoute allowedRoles={[Roles.student]}>
                               <StudDashboard/>
                           </PrivateRoute>}></Route>
                    {/*</Route>*/}
                    <Route path={"*"} element={<PageNotFound/>}/>
                    {/*</Route>*/}
                </Routes>
                {/* </Layout> */}
            </Router>
        </>
    );
};

export default App;
