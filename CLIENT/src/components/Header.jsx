import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/esm/Button";
import useLogout from "../hooks/useLogout";

function Header() {
  const { user } = useAuth();
  const { logout } = useLogout();
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand href="#home" style={{ fontFamily: "Poppins" }}>
            Note
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className="nav-link"
              style={{ fontFamily: "Poppins" }}
            >
              Home
            </NavLink>
            {user && (
              <NavLink
                to="/mynotes"
                className="nav-link"
                style={{ fontFamily: "Poppins" }}
              >
                My Notes
              </NavLink>
            )}
            <NavLink
              to="/addnote"
              className="nav-link"
              style={{ fontFamily: "Poppins" }}
            >
              Add Note
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        {!user && (
          <>
            <Button
              variant="outline-success"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/signup")}
              style={{ marginLeft: "5px" }}
            >
              Signup
            </Button>
          </>
        )}
        {user && (
          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
