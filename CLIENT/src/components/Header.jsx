import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

function Header() {
  const {user} = useAuth()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" style={{textDecoration: 'none'}}>
        <Navbar.Brand href="#home"  style={{'fontFamily': 'Poppins'}}>Note</Navbar.Brand>
        </NavLink>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link" style={{'fontFamily': 'Poppins'}}>Home</NavLink>
            <NavLink to="/addnote" className="nav-link" style={{'fontFamily': 'Poppins'}}>Add Note</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;