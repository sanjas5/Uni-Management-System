import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

function ListaZahtjeva({ id }) {
  const [forma, setForma] = useState(false);
  const [datum, setDatum] = useState("");
  const [podaci, setPodaci] = useState([]);
  const [prviChecked, setPrviChecked] = useState(false);
  const [drugiChecked, setdrugiChecked] = useState(false);
  const [treciChecked, setTreciChecked] = useState(false);
  const [cetvrtiChecked, setCetvrtiChecked] = useState(false);
  const [drugi, setDrugi] = useState("");
  const [prvi, setPrvi] = useState("");
  const [treci, setTreci] = useState("");
  const [cetvrti, setCetvrti] = useState("");
  const [promjena, setPromjena] = useState(0);

  useEffect(() => {
    ucitajPodatke();
  }, [forma, promjena]);

  function ucitajPodatke() {
    axios
      .post("http://127.0.0.1:8000/dws/ucitajZahtjeve/", { korisnik: id })
      .then(
        (response) => {
          console.log(response.data);
          setPodaci(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function prikaziFormu() {
    setForma(!forma);
    console.log(prvi);
    console.log(drugi);
  }
  function sacuvaj() {
    setPromjena(promjena + 1);

    var razlozi = "";
    if (prviChecked) razlozi += prvi;
    if (drugiChecked) razlozi += " " + drugi;
    if (treciChecked) razlozi += " " + treci;
    if (cetvrtiChecked) razlozi += " " + cetvrti;
    console.log(id);
    axios
      .post("http://127.0.0.1:8000/dws/spasiZahtjev/", {
        korisnik: id,
        razlozi: razlozi,
        datum: datum,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    setForma(!forma);
  }

  return (
    <div className="zahtjevi_korisnik">
      <Row>
        <Col>
          <h4>Podneseni zahtjevi</h4>
          <br />{" "}
          {podaci.map((doc) => {
            return (
              <div>
                <div
                  className={
                    doc.fields.zahtjev === "Odbijen"
                      ? "crvena"
                      : doc.fields.zahtjev === "Odobren"
                      ? "zelena"
                      : "proba"
                  }
                >
                  <p>Datum zahtjeva: {doc.fields.datum}</p>
                  <p>Status: {doc.fields.zahtjev}</p>
                  <p>Razlog: {doc.fields.razlozi}</p>
                </div>
                <hr />
              </div>
            );
          })}
          <Button variant="success" onClick={prikaziFormu}>
            Dodaj rad od kuće
          </Button>
        </Col>
      </Row>
      {forma ? (
        <div className="forma">
          <Form className="dodajEvidenciju">
            <Form.Group controlId="formBasicPassword">
              <label>Datum</label>
              <Form.Control
                type="date"
                onChange={(event) => setDatum(event.target.value)}
              />
            </Form.Group>
            <Form.Check
              label="Priprema ispita"
              name="group1"
              value="Priprema ispita"
              onChange={(event) => {
                setPrvi(event.target.value);
                setPrviChecked(!prviChecked);
              }}
            />
            <Form.Check
              label="Ispravljanje ispita"
              value="Ispravljanje ispita"
              name="group1"
              onChange={(event) => {
                setDrugi(event.target.value);
                setdrugiChecked(!drugiChecked);
              }}
            />
            <Form.Check
              label="Online konsultacije"
              value="Online konsultacije"
              name="group1"
              onChange={(event) => {
                setTreci(event.target.value);
                setTreciChecked(!treciChecked);
              }}
            />
            <Form.Check
              label="Ostalo"
              value="Ostalo"
              name="group1"
              onChange={(event) => {
                setCetvrtiChecked(!cetvrtiChecked);
                setCetvrti(event.target.value);
              }}
            />

            <Button variant="success" onClick={sacuvaj}>
              Sačuvaj
            </Button>
          </Form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ListaZahtjeva;