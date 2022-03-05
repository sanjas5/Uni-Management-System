import React, { useState } from "react";
import { Button, Col, FormLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./Pocetna.css";

function PostavkeKartice({ tip, status, ime, prezime, sifra, id, promjena }) {
  const [forma, setForma] = useState(false);
  const [ime_novo, setImeNovo] = useState(ime);
  const [prezimeNovo, setPrezimeNovo] = useState(prezime);
  const [sifraNovo, setSifraNovo] = useState(sifra);
  const [sifraNovoPonovljena, setSifraNovoPonovljena] = useState(sifra);
  const [statusNovo, setStatus] = useState(status);
  const [pogreska, setPogreska] = useState(false);
  const [brojac, setBrojac] = useState(0);
  function prikatiFormu() {
    setForma(!forma);
  }
  function sacuvaj() {
    setPogreska(false);
    if (sifraNovo === sifra) setPogreska(true);
    else if (sifraNovo != sifraNovoPonovljena) setPogreska(true);
    else {
      axios
        .post("http://127.0.0.1:8000/dws/promijeniKorisnika/", {
          ime: ime_novo,
          prezime: prezimeNovo,
          lozinka: sifraNovo,
          id: id,
          status: statusNovo,
        })
        .then(
          (response) => {
            console.log(response);
            setForma(!forma);
            setBrojac(brojac + 1);
            promjena(brojac);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  return (
    <>
      {" "}
      <img src="https://emitherapy.co.za/wp-content/uploads/2020/08/person-icon.png" />{" "}
      <div className="kartica">
        <p>
          Ime:<h5>{ime}</h5>
        </p>
        <p>
          Prezime:<h5>{prezime}</h5>
        </p>
        <p>
          Status:<h5>{status}</h5>
        </p>
        <p>
          Tip:
          <h5>{tip}</h5>
        </p>

        <button className="promjena" onClick={prikatiFormu}>
          Promijeni
        </button>
        {forma ? (
          <Form className="">
            {pogreska ? (
              <FormLabel>
                Greška prilikom unosa lozinke, molimo Vas unesite ponovo!
              </FormLabel>
            ) : (
              <div></div>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite  ime"
                onChange={(event) => setImeNovo(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite prezime"
                onChange={(event) => setPrezimeNovo(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Aktivan">Aktivan</option>
                <option value="Na bolovanju">Na bolovanju</option>
                <option value="Na godišnjem odmoru">Na godišnjem odmoru</option>
                <option value="Neaktivan">Neaktivan</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite lozinku"
                onChange={(event) => setSifraNovo(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Potvrdite lozinku</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite lozinku ponovo"
                onChange={(event) => setSifraNovoPonovljena(event.target.value)}
              />
            </Form.Group>

            <button className="promjena" onClick={sacuvaj}>
              Unesi promjene
            </button>
          </Form>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default PostavkeKartice;