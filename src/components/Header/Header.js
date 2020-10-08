import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Header.css';
const Header = (props) => {
    console.log(props);
    // if (props.location.pathname == "/home") return null;
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">DigiDiya</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Login</Nav.Link>
                        <Nav.Link href="/Admin">Admin</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};


export default withRouter(Header);