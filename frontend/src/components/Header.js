import React from 'react'

import { Navbar, Nav, Container, Row} from 'react-bootstrap' //installed using the console

function Header(){
	return (
		<header>
			<Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
				<Container>
					<Navbar.Brand href="home">ProShop</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/home"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
						<Nav.Link href="/link"><i className="fas fa-user"></i> Login</Nav.Link>
					</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>

	)
}

export default Header