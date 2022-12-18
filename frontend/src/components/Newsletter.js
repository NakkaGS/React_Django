import React from 'react'

//Boostrap Components
import { Form, Button } from 'react-bootstrap'

function Newsletter() {
  return (
    <div id='newsletter'>
        <div className="newstext">
            <h4>Sign Up for Newsletter</h4>
            <p>Get E-mail updates about our latest shop and <span>special offers.</span></p>
        </div>
        <div className="form">
            <Form.Group controlId="email">
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter your Email"
                ></Form.Control>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </div>

    </div>
  )
}

export default Newsletter