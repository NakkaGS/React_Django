//App.js->Route->CartScreen.js

import React, { useEffect } from 'react'

//Router
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { addToCart } from '../actions/cartActions'

//Boostrap Components
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

//Components
import Message from '../components/Message'
import InfoModal from '../components/InfoModal'

function CartScreen({match}) { //match is used in useParams and history is useNavigate
  let product = useParams(match)
  let productId = product.id
  
  //Local Storage
  const location = useLocation()//this functions is equal to location.search
  const qty = location.search ? Number(location.search.split('=')[1] ): 1 //it get the route $qty=1, separate $qty and 1, after get the second array 
  //console.log('qty: ', qty)
  //console.log('ID: ', productId.id)

  const dispatch = useDispatch()
  let history = useNavigate() 

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart //the data it is in Local Storage
  //console.log('cartItems: ', cartItems)

  useEffect(() => {
    if (productId) {
        dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  //just to test the function
  const checkoutHandler = () => {
    //console.log('history: ', history)
    history('/shipping')//it is using useNavigate, it doesn't need push
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : ( //else
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>

                  <Col md={3}>
                  <Form.Control
                    as='select'
                    value={item.qty} //it must have the same name as in the database attribute
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                    {
                      [...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))
                    }

                  </Form.Control>
                  </Col>
                  


                  <Col md={1}>
                    <InfoModal item={item} />    
                  </Col>

                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {/* ////////////////////// */}
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)} items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Check
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>


  )
}


export default CartScreen