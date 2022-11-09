//App.js->HomeScreen.js

import React, { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProducts } from '../actions/productActions'

//Boostrap Components
import { Row, Col } from "react-bootstrap"; //installed using the console

//Components
import Product from '../components/Product'; //import the component Product
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

import MainBody from '../components/MainBody'

//Axios
//import axios from 'axios' //not been used after the Redux application
//import products from "../products"; //reads the file products.js

function HomeScreen() {
  //const [products, setProducts] = useState([]) //not been used after the Redux application

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList 
  //separate the data from the productList

  useEffect(() => {

    dispatch(listProducts())

    //It is part is same as in the action (productActions) - This part is used when we don't have Redux (it get the data from the Django)
  /*     async function fetchProducts() {
      const { data } = await axios.get('/api/products/')
      setProducts(data)
    } 

    fetchProducts()
    */

  }, [dispatch]) //it is to create a loading/ error view
 
  return (
    <div>
      <MainBody />
      <h1>Latest Products</h1>

      {loading ? <Loader /> //it is to create the loadin and error view 
            :error ? <Message variant='danger'>{error}</Message>
              :
              <Row>
              {products?.map(product => ( //it was added ? because it was given fault. It is first asking if the array existed 
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
              </Row>
          }

    </div>
  );
}

export default HomeScreen;
