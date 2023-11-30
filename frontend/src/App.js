import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Homepage from "./containers/Homepage";
import IntroPage from "./containers/IntroPage";
import Login from "./containers/Login";
import Layout from "./hocs/Layout";
import Signup from "./containers/Signup";
import PrivateRoute from "./hocs/PrivateRoute";
import StudDashboard from "./containers/student/StudDashboard";

const Roles = {
  admin: "ADMIN",
  student: "STUDENT",
  teacher: "TEACHER",
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route element={<Layout />} path="/">
            {/*public routes*/}
            <Route element={<IntroPage />} path={"/"} exact />
            <Route element={<Login />} path="login" exact />
            <Route element={<Signup />} path={"sign-up"} exact />

            <Route
              element={
                <PrivateRoute
                  allowedRoles={[Roles.admin, Roles.student, Roles.teacher]}
                />
              }
            >
              <Route element={<Homepage />} path="home" exact />

              <Route element={<PrivateRoute allowedRoles={[Roles.student]} />}>
                <Route element={<StudDashboard />} path="student/dashboard" />
              </Route>
            </Route>
          </Route>
        </Routes>
        {/* </Layout> */}
      </Router>
    </Provider>
  );
};

export default App;
