import {Fragment} from "react";
import {Container} from "react-bootstrap";
import Navbars from "../../components/Navbars";
import {connect} from "react-redux";
import Footer from "../../components/Footer";


const StudDashboard = ({profile}) => {
    console.log(profile)
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

const mapStateToProps = state => ({
    profile: state.profile.profile
});

export default connect(mapStateToProps, {})(StudDashboard);