import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'

// Navbar component that includes react-bootstrap link elements
const Banner = () => {
  return (
    <>
          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="#home">MadLibs</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/add">Add</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>
      </>
  );
}

export default Banner;