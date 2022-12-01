//index.html->index.js->App.js->Header.js
//Page Header / NAV

import React from "react";

//Router
import { LinkContainer } from "react-router-bootstrap";

//Boostrap Components
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"; //installed using the console
//import { Link } from "react-router-dom";

//Redux
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

//Components
import ItemsInCart from '../components/ItemsInCart'
import SearchBox from '../components/SearchBox'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

          
            <Nav className="me-auto">
            <SearchBox/>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart <ItemsInCart />
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
                  
              ) : (
                <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
              )}

            </Nav>

            <Nav className="float-end">
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenue'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}
            </Nav>
            
          </Navbar.Collapse>
        </Container>


      </Navbar>
    </header>
  );
}

export default Header;
