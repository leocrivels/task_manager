import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <Navbar style={{backgroundColor:"#0B132B"}} variant="dark">
        <Container>
        <Navbar.Brand className="mx-2 me-auto">
          <span>Task Manager</span>
        </Navbar.Brand>
        <Navbar.Collapse className="mx-2 justify-content-end">
          <Nav>
            <Nav.Link to={"/home"} className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link
              href="/login"
              className="nav-link"
              onClick={currentUser ? logOut : null}
            >
              {currentUser ? "LogOut" : "Login"}
            </Nav.Link>
            {currentUser ? (
              <Nav.Link href={"/profile"} className="nav-link">
                {currentUser.username}
              </Nav.Link>
            ) : (
              <Nav.Link href={"/register"} className="nav-link">
                Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </div>
  );
};
export default App;
