import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

//

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts);
  }, [dispatch]);
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;