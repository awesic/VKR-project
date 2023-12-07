import {Fragment} from "react";
import notfound from "img/notfound.jpg";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";

const PageNotFound = () => {
    return (<Fragment>
            <div style={{
                background: `url(${notfound}) no-repeat center center`,
                backgroundSize: 'cover',
                height: '100vh'
            }}>
                <Container className={"justify-content-center d-flex"}>
                    <h1>404 Page Not Found</h1>
                    <Link to={"/home"} className={"btn btn-lg btn-outline-secondary rounded-5"}>На
                        главную</Link>
                </Container>
            </div>
        </Fragment>)
}
export default PageNotFound;