import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginForm from './LoginForm';
import * as Auth from '../utils/auth';  // Corrected import

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Book Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {Auth.loggedIn() ? (
              <>
                <Nav.Link href="/saved">Saved Books</Nav.Link>
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <LoginForm />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
