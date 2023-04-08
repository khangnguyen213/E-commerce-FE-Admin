import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "../Redux/Reducer/sessionSlice";
import alertify from "alertifyjs";
import Global from "../global";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.session.isLogged);
  const role = useSelector((state) => state.session.role);
  useEffect(() => {
    if (!isLogged) {
      axios
        .get(`${Global.BASE_BACKEND_API}/check-session`, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(login(res.data));
        })
        .catch((err) => navigate("/login"));
    }
  }, [isLogged]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const loginClickedHandler = () => {
    navigate("/login");
  };
  const registerClickedHandler = () => {
    navigate("/register");
  };

  const logoutClickedHandler = () => {
    axios
      .get("http://localhost:5000/users/logout", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(logout());
        alertify.success("<div style='color:white'>Successful Logout!</div>");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.header}>
      <h2>ADMIN</h2>
      <div className={styles.nav1}>
        {isLogged && role === "admin" && (
          <>
            <NavLink
              className={styles.nav_link}
              style={(e) => {
                return e.isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={styles.nav_link}
              to="/products"
              style={(e) => {
                return e.isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
            >
              Products
            </NavLink>
            <NavLink
              className={styles.nav_link}
              to="/orders"
              style={(e) => {
                return e.isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
            >
              Orders
            </NavLink>
          </>
        )}
        {isLogged && (
          <>
            <NavLink
              className={styles.nav_link}
              to="/chat"
              style={(e) => {
                return e.isActive
                  ? { color: "black", textDecoration: "underline" }
                  : {};
              }}
            >
              Chat
            </NavLink>
            <Button
              variant="outline-dark"
              className={styles.nav_button}
              onClick={logoutClickedHandler}
            >
              Logout
            </Button>
          </>
        )}

        {!isLogged && (
          <>
            <Button
              variant="outline-dark"
              className={styles.nav_button}
              onClick={loginClickedHandler}
            >
              Login
            </Button>
            <Button
              variant="outline-dark"
              className={styles.nav_button}
              onClick={registerClickedHandler}
            >
              Register
            </Button>
          </>
        )}
      </div>
      <div className={styles.nav2}>
        <Button variant="dark" onClick={toggleShow} className="me-2">
          {"▼"}
        </Button>
        <Offcanvas
          show={show}
          onHide={handleClose}
          scroll={false}
          backdrop={true}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.nav2_body}>
            {isLogged && role === "admin" && (
              <>
                <NavLink
                  className={styles.nav_link}
                  to="/dashboard"
                  style={(e) => {
                    return e.isActive
                      ? { color: "black", textDecoration: "underline" }
                      : {};
                  }}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className={styles.nav_link}
                  to="/products"
                  style={(e) => {
                    return e.isActive
                      ? { color: "black", textDecoration: "underline" }
                      : {};
                  }}
                >
                  Products
                </NavLink>
                <NavLink
                  className={styles.nav_link}
                  to="/orders"
                  style={(e) => {
                    return e.isActive
                      ? { color: "black", textDecoration: "underline" }
                      : {};
                  }}
                >
                  Orders
                </NavLink>
              </>
            )}

            {isLogged && (
              <>
                <NavLink
                  className={styles.nav_link}
                  to="/chat"
                  style={(e) => {
                    return e.isActive
                      ? { color: "black", textDecoration: "underline" }
                      : {};
                  }}
                >
                  Chat
                </NavLink>

                <Button
                  variant="outline-dark"
                  className={styles.nav_button}
                  onClick={logoutClickedHandler}
                >
                  Logout
                </Button>
              </>
            )}

            {!isLogged && (
              <>
                <Button
                  variant="outline-dark"
                  className={styles.nav_button}
                  onClick={loginClickedHandler}
                >
                  Login
                </Button>
                <Button
                  variant="outline-dark"
                  className={styles.nav_button}
                  onClick={registerClickedHandler}
                >
                  Register
                </Button>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default NavBar;
