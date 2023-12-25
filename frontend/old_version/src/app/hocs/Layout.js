import {Fragment} from "react";
import {Helmet} from "react-helmet";

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