import React from 'react'

//Components
import Rating from './Rating'

import { Link } from 'react-router-dom'

import { Badge } from 'react-bootstrap'

function ProductNKT({ product }) {
  return (
    <div id='nktproduct'>
        <div className='nktcard'>
            <Link to={`/product/${product._id}`}>
                <img src={product.image}></img>
            </Link>
            
            <div className='nktcard-description'>
                <span>{product.category}</span>
                <h4>{product.name}</h4>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                <h5>${product.price}</h5>
            </div>
            <div className='nktcard-stock'>
                {product?.countInStock > 0 ? (<Badge bg="success">'In Stock'</Badge>) : (<Badge bg="danger">'Out of Stock'</Badge>)}
            </div>
        </div>

    </div>


  )
}

export default ProductNKT