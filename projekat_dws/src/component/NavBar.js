import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./Pocetna.css";

function NavBar({ odjava, ime, status, prezime }) {
  return (
    <div className="fiksiraj">
      <Navbar className="navbar" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="">
          <img
            alt=""
            src="https://assets.change.org/photos/0/nl/uz/SWnlUZSlDYIyCLd-800x450-noPad.jpg?1531845163"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span className="nazivApp">Fakultetska evidencija</span>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="" className="podaci">
            Korisnik:
            <span className="user">
              {" " + ime + " "}
              {prezime}
            </span>
          </Nav.Link>
          <Nav.Link href="" className="podaci">
            Status:
            <span className="user">{" " + status}</span>
          </Nav.Link>
        </Nav>
        <Button className="odjava" onClick={odjava}>
          Odjavi se
        </Button>
      </Navbar>
    </div>
  );
}

export default NavBar;