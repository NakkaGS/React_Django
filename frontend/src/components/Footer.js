//index.html->index.js->App.js->Footer.js
//Page Footer

import React from "react";

//Router
import { LinkContainer } from "react-router-bootstrap";

//Redux
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

//Bootstrap Components
import { Container, Row, Col } from "react-bootstrap";

//Router and Bootstrap
import { Link } from 'react-router-dom'

function Footer() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col>
              <h4>Contact</h4>
              <p><strong>Address: </strong>562 Wellington Road,...</p>
              <p><strong>Phone: </strong>84984984,...</p>
              <p><strong>Hours: </strong>10:00 - 18:00. Mon-Sat</p>
              <div className="follow">
                  <h4>Follow us</h4>
                  <div className="icon">
                      <i className="fab fa-facebook -f"></i>
                      <i className="fab fa-twitter -f"></i>
                      <i className="fab fa-instagram -f"></i>
                      <i className="fab fa-pinterest-p -f"></i>
                      <i className="fab fa-youtube -f"></i>
                  </div>
              </div>
            </Col>

            <Col className="nktFooter">
              <h4>My Account</h4>
              
              {userInfo ? (
                <div>
                  <Link to='/profile'> Profile </Link>
                  <Link onClick={logoutHandler}> Logout </Link>
                </div>
                
              ) : (
              <Link to="/login">
                <i className="fas fa-user"></i> Login
              </Link>
              )}
              <Link to="/cart">Cart</Link>
            </Col>

            <Col>
              <h4>Install App</h4>
              <p>From App Store or Google Play</p>
            </Col>

            <div class="copyright">
              <p>2021, Tech2etc - HTML CSS Ecoomerce Template</p>
            </div>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
