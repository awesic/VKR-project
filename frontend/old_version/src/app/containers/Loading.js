import {Container, Spinner} from "react-bootstrap";
import React from "react";

const Loading = () => {
    return (
        <>
            <Container className={"d-flex justify-content-center align-items-center"} style={{height: '90vh'}}>
                <Spinner variant={"secondary"} animation={"border"}/>
            </Container>
        </>
    )
}
export default Loading