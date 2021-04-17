import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAuth from "./auth/Nav";
import { LinkContainer } from "react-router-bootstrap";

function AppContainer({ title, children, nav = "" }) {
  if (nav === "false") {
    return (
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="card">
          <h5 className="card-header">{title}</h5>
          <div className="card-body">{children}</div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Navbar bg="secondary" variant="dark">
          <LinkContainer to="/" style={{ cursor: "pointer" }}>
            <Navbar.Brand className="pr-4 text-white">Home</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/add" style={{ cursor: "pointer" }}>
            <Navbar.Brand className="pr-4 text-white">Add task</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavAuth />
          </Navbar.Collapse>
        </Navbar>
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="card">
            <h5 className="card-header">{title}</h5>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </>
    );
  }
}

export default AppContainer;
