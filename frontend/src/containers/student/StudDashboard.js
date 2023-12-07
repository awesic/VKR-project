import {Fragment} from "react";
import {Container} from "react-bootstrap";
import Navbars from "../../components/Navbars";
import {connect, useSelector} from "react-redux";
import Footer from "../../components/Footer";


const StudDashboard = () => {
    const {userInfo} = useSelector((state) => state.user)
    // console.log(userInfo)
    return (
        <Fragment>
            <Navbars/>
            <Container>
                <h1>Student Dashboard</h1>
            </Container>
            <Footer/>
        </Fragment>
    )
};
export default StudDashboard
// const mapStateToProps = state => ({
//     profile: state.profile.profile
// });
//
// export default connect(mapStateToProps, {})(StudDashboard);