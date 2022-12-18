import React from 'react'

//Boostrap Components
import { Row, Col } from 'react-bootstrap'

function DualGrid() {
  return (
    <div className='dualgrid'>
        <Row>
            <Col>
                <div className='dualgrid-left'>
                    <h3>20% OFF for all Playstation 4 Accessories</h3>
                    <h4>Exclusive online & in der App</h4>

                    <button className='normal'>Shop Now</button>
                </div>
            </Col>
            <Col>
                <div className='dualgrid-right'>
                    <img src='../public/images/ps4-pro.jpg' alt=''></img>
                </div>

            </Col>
        </Row>
    </div>
  )
}

export default DualGrid