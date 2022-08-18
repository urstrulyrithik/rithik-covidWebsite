import React from 'react'

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import './Navbar.css'
function NavbarHome() {
	return (
		<div className='mainCont'>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="/">Covid</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto mainCont">
							<Nav.Link href="/">Home</Nav.Link>

						</Nav>
						<Nav>
							<Nav.Link href="/feedback">Feedback</Nav.Link>
							<Nav.Link href="/login">Login</Nav.Link>

							<Nav.Link href="/signup">Sign Up</Nav.Link>
							<Nav.Link href="/statistics">Statistics</Nav.Link>
							<NavDropdown title="Health Care" id="collasible-nav-dropdown">
								<NavDropdown.Item href="./health?type=medical">Medical Colleges</NavDropdown.Item>
								<NavDropdown.Item href="./health?type=hospital">Hospitals</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default NavbarHome
