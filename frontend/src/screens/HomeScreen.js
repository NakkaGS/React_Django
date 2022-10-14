//App.js->HomeScreen.js

import React from "react";

import { Row, Col } from "react-bootstrap"; //installed using the console

import products from "../products"; //reads the file products.js
import Product from "../components/Product"; //import the component Product

function HomeScreen() {
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
