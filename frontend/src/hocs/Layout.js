import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated } from "../actions/auth";
import { load_user } from "../actions/profile";
import { Outlet } from "react-router-dom";

const Layout = ({ children, checkAuthenticated, load_user }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (
    <Fragment>
      <Outlet />
      {/* {children} */}
    </Fragment>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
