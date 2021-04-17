import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useGlobalContext } from "../../context";

function Nav() {
  const { token, user, logOutCtx } = useGlobalContext();

  if (token === "") {
    return (
      <>
        <LinkContainer to="/login" style={{ cursor: "pointer" }}>
          <Navbar.Text className="pr-4 text-white">Login</Navbar.Text>
        </LinkContainer>
        <Navbar.Text>
          <Link to={"/register"}>Register</Link>
        </Navbar.Text>
      </>
    );
  } else {
    return (
      <>
        <LinkContainer to="/login" style={{ cursor: "pointer" }}>
          <Navbar.Text className="pr-4 text-white">
            Signed in as: {user.name ?? "..."}
          </Navbar.Text>
        </LinkContainer>
        <LinkContainer to="/login" style={{ cursor: "pointer" }}>
          <Navbar.Text className="pr-4 text-white" onClick={logOutCtx}>
            Logout
          </Navbar.Text>
        </LinkContainer>
      </>
    );
  }
}

export default Nav;
