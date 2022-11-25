import React, { useEffect } from "react";

//Router
import { Link } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProducts } from '../actions/productActions'

//Boostrap Components
import { Carousel, Image, Row, Col } from 'react-bootstrap'

//Components
import Loader from './Loader' //to have the Spinner in the page
import Message from './Message' //to have the Error in the page

function ProductsCarousel() {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  useEffect(() => {
      dispatch(listProducts())
  }, [dispatch])

  return (
      loading ? <Loader /> //it is to create the loadin and error view 
      :error ? <Message variant='danger'>{error}</Message>
      :
        <Carousel variant="dark" fade >
        {products?.map(product => ( //it was added ? because it was given fault. It is first asking if the array existed 

          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>

              <Row>
                <Col md={6} style={{height:"22rem", display: "flex", marginTop: "2.5rem", justifyContent: "center"}}>
                  <Image src={product.image} alt={product.name} fluid style={{height:"15rem", width:"15rem"}}/>
                </Col>

                <Col md={4}>
                    <h2>{ product.name }</h2>
                    <p>{ product?.description }</p>
                    <h3>${product.price}</h3>
                </Col>
                
              </Row>
            </Link>
          </Carousel.Item>
        ))}
        
        </Carousel>  

  )
}

export default ProductsCarousel