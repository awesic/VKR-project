import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../containers/Loading";

const LazyLayout = () => {
    return (
        <>
            <Suspense fallback={<Loading/>}>
                <Outlet/>
            </Suspense>
            <Footer/>
        </>
    )
}
export default LazyLayout