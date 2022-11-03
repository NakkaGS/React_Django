//index.html->index.js->App.js->HomeScreen.js

//This is the main body

import React from "react";

import { Container } from "react-bootstrap"; //installed using the console
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from "./components/Header"; //using <Header /> it will add the content from the component
import Footer from "./components/Footer"; //using <Footer /> it will add the content from the component

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

//it is equal to <body>
function App() {
  return (
      <Router>
        <Header />
        
        <main className="py-3">
          <Container>
            <Routes> {/* the Route needs to be involver with Routes and Router*/}
              <Route path='/' element={<HomeScreen/>} exact /> {/* In the new version, it is element and not component */}
              <Route path='product/:id' element={<ProductScreen/>} />
              <Route path='cart/:id' element={<CartScreen/>} /> {/* The new version we need to write all the possible links */}
              <Route path='cart' element={<CartScreen/>} /> {/* it doesn't need the first '/'-----the ? in the end, means that we don't need to pass the value all the time */}
            </Routes>
          </Container>
        </main>

        <Footer />
      </Router>
  );
}

export default App;
