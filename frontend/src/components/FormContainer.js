//index.html->index.js->LoginScreen.js->FormContainer.js
//This is the main body or where the web context will be shown

import React from 'react'

//Bootstrap Components
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer