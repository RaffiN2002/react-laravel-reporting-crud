import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
function Header() {
  let user = JSON.parse(localStorage.getItem('user-info'))
  const navigate=useNavigate();
  
  function logOut(){
    localStorage.clear();
    navigate("/register")
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Menu</Navbar.Brand>
        <Nav className="mr-auto navbar_wrapper">
          {
            localStorage.getItem('user-info')?
            <>
                        <Link to="/addReport">Add Report</Link>
                        <Link to="/search">Search</Link>
            </> :
            <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
            </>
          }
        </Nav>
        {localStorage.getItem('user-info')?
        <Nav className='ms-auto'>
          <NavDropdown title={user && user.user.name}>
            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        :null }
      </Navbar>
      <h1> Reporting Page</h1>
    </div>
  );
}

export default Header;