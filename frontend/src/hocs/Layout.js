import {Fragment, useEffect} from "react";
import {connect} from "react-redux";
import {checkAuthenticated} from "../actions/auth";
import {load_user} from "../actions/profile";
import {Outlet} from "react-router-dom";
import {Helmet} from "react-helmet";

// const Layout = ({children, checkAuthenticated, load_user}) => {
//     useEffect(() => {
//         checkAuthenticated();
//         load_user();
//     }, []);
//
//     return (
//         <Fragment>
//             {/*<main className="App">*/}
//             {/*<Outlet/>*/}
//             {/*</main>*/}
//             {children}
//         </Fragment>
//     );
// };
//
// export default connect(null, {checkAuthenticated, load_user})(Layout);

const Layout = ({title, content, children}) => (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name={"description"} content={content}/>
        </Helmet>
        {children}
    </>
)
export default Layout;