import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Col, Button, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListaZahtjeva from "./ListaZahtjeva";
import Sidebar from "./Sidebar";
import axios from "axios";

function EvidencijaRadaOdKuce({
  id,
  tip,
  odjava,
  pred,
  postavke,
  evidencija,
  evidencijaR,
  osoblje,
  pocetna,
  info,
  stil,
}) {
  const [zahtjevi, setZahtjevi] = useState(false);
  const [zahtjeviOdobreni, setOdobreniZahtjevi] = useState([]);
  const [polje, setPolje] = useState(false);
  const [podaci, setPodaci] = useState([]);
  const [datum, setDatum] = useState("");
  const [prviChecked, setPrviChecked] = useState(false);
  const [drugiChecked, setdrugiChecked] = useState(false);
  const [treciChecked, setTreciChecked] = useState(false);
  const [cetvrtiChecked, setCetvrtiChecked] = useState(false);
  const [drugi, setDrugi] = useState("");
  const [prvi, setPrvi] = useState("");
  const [treci, setTreci] = useState("");
  const [cetvrti, setCetvrti] = useState("");
  const [korisnici, setKorisnici] = useState("");
  const [noviKorisnik, setNoviKorisnik] = useState("");
  const [brojac, setBrojac] = useState(0);

  useEffect(() => {
    ucitajPodatke();
    odobreneZahtjeve();
    ucitajKorisnike();
  }, [polje, brojac]);

  function odobreneZahtjeve() {
    axios.post("http://127.0.0.1:8000/dws/odobreniZahtjevi/").then(
      (response) => {
        console.log(response.data);
        setOdobreniZahtjevi(response.data.zahtjevi);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  function ucitajKorisnike() {
    axios.post("http://127.0.0.1:8000/dws/ucitajKorisnike/").then(
      (response) => {
        console.log(response.data);
        setKorisnici(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  function ucitajPodatke() {
    axios.post("http://127.0.0.1:8000/dws/sefZahtjevi/").then(
      (response) => {
        setPodaci(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  function odobriOdbijZahtjev(status, id) {
    axios
      .post("http://127.0.0.1:8000/dws/odobriOdbij/", {
        status: status,
        id: id,
      })
      .then(
        (response) => {
          console.log(response.data);
          setBrojac(brojac + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  function sacuvaj() {
    setPolje(!polje);
    var razlozi = "";
    if (prviChecked) razlozi += prvi;
    if (drugiChecked) razlozi += " " + drugi;
    if (treciChecked) razlozi += " " + treci;
    if (cetvrtiChecked) razlozi += " " + cetvrti;
    console.log(id);
    axios
      .post("http://127.0.0.1:8000/dws/spasiZahtjevSef/", {
        korisnik: noviKorisnik,
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
  }

  function prikaziZahtjeve() {
    setZahtjevi(!zahtjevi);
  }

  function prikaziPolje() {
    setPolje(!polje);
  }

  return (
    <div>
      <NavBar
        odjava={odjava}
        ime={info.ime}
        prezime={info.prezime}
        status={info.status}
      />
      <Row>
        <Col xs={3}>
          <Sidebar
            tip={info.tip_korisnika}
            id={id}
            info={info}
            pocetna={pocetna}
            evidencija={evidencija}
            evidencijaRada={evidencijaR}
            korisnici={osoblje}
            postavke={postavke}
            predmeti={pred}
            stil={stil}
          />
        </Col>
        <Col>
          {tip === "Šef odsjeka" ? (
            <div>
              <div className="evidencijaOdKuce">
                <h5>Odobreni zahtjevi za rad od kuće:</h5>
                <ul>
                  {zahtjeviOdobreni.map((doc) => {
                    return (
                      <li>
                        {doc.korisnik}- {doc.datum}
                      </li>
                    );
                  })}
                </ul>

                <Button variant="secondary" onClick={prikaziPolje}>
                  Dodaj rad od kuće
                </Button>
                <Button variant="success" onClick={prikaziZahtjeve}>
                  Odobri rad od kuće
                </Button>
                {zahtjevi ? (
                  <Row className="zahtjevi">
                    <Col>
                      {podaci.map((doc) => {
                        return (
                          <div key={doc.pk}>
                            <p>
                              Datum zahtjeva: {doc.fields.datum}
                              <br />
                              Razlog rada od kuće: {doc.fields.razlozi}
                            </p>
                            <Button
                              variant="success"
                              onClick={() =>
                                odobriOdbijZahtjev("Odobren", doc.pk)
                              }
                            >
                              Odobri
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() =>
                                odobriOdbijZahtjev("Odbijen", doc.pk)
                              }
                            >
                              Odbij
                            </Button>
                          </div>
                        );
                      })}
                    </Col>
                  </Row>
                ) : (
                  <div></div>
                )}

                {polje ? (
                  <div className="forma">
                    <Form className="dodajEvidenciju">
                      <Form.Group controlId="formBasicEmail">
                        <label>Profesori</label>
                        <Form.Control
                          as="select"
                          onChange={(event) =>
                            setNoviKorisnik(event.target.value)
                          }
                        >
                          {korisnici.map((doc) => {
                            return (
                              <option value={doc.pk}>
                                {doc.fields.ime}
                                {doc.fields.prezime}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>

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
            </div>
          ) : (
            <div>
              <ListaZahtjeva id={id} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default EvidencijaRadaOdKuce;