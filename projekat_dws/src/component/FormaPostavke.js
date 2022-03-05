import React from "react";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function FormaPostavke() {
  return (
    <Form className="">
      <Form.Group controlId="formBasicEmail">
        <label>Ime</label>
        <Form.Control type="text" placeholder="Unesite  ime" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <label>Prezime</label>
        <Form.Control type="text" placeholder="Unesite prezime" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <label>Lozinka</label>
        <Form.Control type="password" placeholder="Unesite lozinku" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <label>Potvrdite lozinku</label>
        <Form.Control type="password" placeholder="Unesite lozinku" />
      </Form.Group>

      <Button variant="primary">Prijavi se</Button>
    </Form>
  );
}

export default FormaPostavke;