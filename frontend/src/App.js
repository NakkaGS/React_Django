//index.html->index.js->App.js->HomeScreen.js

//This is the main body

import React from "react";

import { Container } from "react-bootstrap"; //installed using the console
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //it is used for the endpoints

import Header from "./components/Header"; //using <Header /> it will add the content from the component
import Footer from "./components/Footer"; //using <Footer /> it will add the content from the component

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from './screens/OrderListScreen'
import ProductListScreen from "./screens/ProductListScreen";

//it is equal to <body>
function App() {
  return (
      <Router>
        <Header />
        
        <main className="py-3">
          <Container>
            <Routes> {/* the Route needs to be involver with Routes and Router*/}
              <Route path='/' element={<HomeScreen/>} exact /> {/* In the new version, it is element and not component */}

              {/* it doesn't need the first '/'-----the ? in the end, means that we don't need to pass the value all the time */}
              <Route path='product/:id' element={<ProductScreen/>} />

              <Route path='cart' element={<CartScreen/>} /> {/* The new version we need to write all the possible links */}
              
              <Route path='cart/:id' element={<CartScreen/>} /> 

              <Route path='login' element={<LoginScreen/>} />

              <Route path='register' element={<RegisterScreen/>} />

              <Route path='profile' element={<ProfileScreen/>} />

              <Route path='shipping' element={<ShippingScreen/>} />

              <Route path='payment' element={<PaymentScreen/>} />
            
              <Route path='placeorder' element={<PlaceOrderScreen/>} />

              <Route path='order/:id' element={<OrderScreen />} />

              <Route path='admin/userlist' element={<UserListScreen/>} />

              <Route path='admin/user/:id/edit' element={<UserEditScreen/>} />

              <Route path='admin/orderlist' element={<OrderListScreen/>} />

              <Route path='admin/productlist' element={<ProductListScreen/>} />

            </Routes>
          </Container>
        </main>

        <Footer />
      </Router>
  );
}

export default App;
