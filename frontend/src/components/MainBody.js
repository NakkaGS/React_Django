import React, { useEffect } from "react";

//Router
import { Link } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProducts } from '../actions/productActions'

//Boostrap Components
import { Carousel, Image }from 'react-bootstrap'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

function MainBody() {

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
            <Link to={`/product/${product._id}`}>

              <Image src={product.image} alt={product.name} fluid style={{height:"25rem", width:"25rem", margin: "auto", display: "flex", justifyContent: "center"}}/>

              <Carousel.Caption>
                <h3>{ product.name }</h3>
              </Carousel.Caption>

            </Link>
          </Carousel.Item>
        ))}
        
        </Carousel>  

  )
}

export default MainBody