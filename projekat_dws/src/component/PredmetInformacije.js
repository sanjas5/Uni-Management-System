import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

function PredmetInformacije({
  naziv,
  asistent,
  profesor,
  termin_predavanja,
  termin_vjezbi,
  osoblje,
  god,
  sem,
  id,
  tip,
  promjena,
}) {
  const [forma, setForma] = useState(false);
  const [podaci, setPodaci] = useState([]);

  const [prof, setProfesor] = useState(profesor);
  const [as, setAsistent] = useState(asistent);
  const [predmet, setPredmet] = useState(naziv);
  const [predavanje, setPredavanje] = useState(termin_predavanja);
  const [vjezbe, setVjezbe] = useState(termin_vjezbi);
  const [semestar, setSemestar] = useState(god);
  const [godina, setGodina] = useState(sem);
  const [brojac, setBrojac] = useState(1);
  function spasi() {
    setForma(!forma);
    setBrojac(brojac + 1);

    axios
      .post("http://127.0.0.1:8000/dws/promijeniPredmet/", {
        naziv: predmet,
        profesor: prof,
        asistent: as,
        vjezbe: vjezbe,
        predavanje: predavanje,
        semestar: semestar,
        godina: godina,
        id: id,
      })
      .then(
        (response) => {
          console.log(response.data);
          promjena(brojac);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  function izbrisi() {
    axios.post("http://127.0.0.1:8000/dws/izbrisiPredmet/", { id: id }).then(
      (response) => {
        console.log(response.data);
        setBrojac(brojac + 1);
        promjena(brojac + 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  return (
    <div className="predmetInfo">
      <h3>Naziv predmeta: {naziv}</h3>
      <p>Profesor: {profesor}</p>
      <p>Asistent: {asistent}</p>
      <p>Termin predavanja: {termin_predavanja}</p>
      <p>Termin vježbi: {termin_vjezbi}</p>
      {tip === "Šef odsjeka" || tip === "Dekan" ? (
        <div>
          <Button variant="danger" onClick={izbrisi}>
            Izbriši
          </Button>
          <Button variant="primary" onClick={() => setForma(!forma)}>
            Uredi
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      {forma ? (
        <Form className="dodaj_predmet">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Predmeta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite naziv predmeta"
              onChange={(event) => setPredmet(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Profesor</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) => setProfesor(event.target.value)}
            >
              {osoblje.map((doc) => {
                return (
                  <option value={doc.pk}>
                    {doc.fields.ime}
                    {doc.fields.prezime}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Asistent</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) => setAsistent(event.target.value)}
            >
              {osoblje.map((doc) => {
                return (
                  <option value={doc.pk}>
                    {doc.fields.ime}
                    {doc.fields.prezime}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Termin predavanja</Form.Label>
            <Form.Control
              type="time"
              placeholder="Unesite termin predavanja"
              onChange={(event) => setPredavanje(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Termin vježbi</Form.Label>
            <Form.Control
              type="time"
              placeholder="Unesite termin vježbi"
              onChange={(event) => setVjezbe(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Semestar</Form.Label>
            <Form.Control
              type="number"
              placeholder="Unesite semestar"
              onChange={(event) => setSemestar(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Godina</Form.Label>
            <Form.Control
              type="number"
              placeholder="Unesite godinu"
              onChange={(event) => setGodina(event.target.value)}
            />
          </Form.Group>

          <Button class="d" variant="primary" onClick={spasi}>
            Spasi promjene
          </Button>
        </Form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PredmetInformacije;