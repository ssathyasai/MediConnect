import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import '../styles/main.css';

const NavigationBar = ({ isLoggedIn, user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onLogout();
        navigate('/');
    };

    return (
        <Navbar bg="body-tertiary" expand="lg" className="nav-underline" id="nav">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">MediConnect</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link as={Link} to="/" active>Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/mentalhealth">Mental Health</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/symptom">Symptom Checker</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/data">Health Data</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/meal">Nutrition Planning</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/about">Contact Us</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login">
                                    <Button variant="primary" style={{ marginLeft: '10px' }}>Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="success" style={{ marginLeft: '10px' }}>SignUp</Button>
                                </Link>
                            </>
                        ) : (
                            <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;