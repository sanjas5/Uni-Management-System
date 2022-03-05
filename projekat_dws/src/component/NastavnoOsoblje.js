import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Col, FormLabel, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./Pocetna.css";

function NastavnoOsoblje({
  profesori,
  asitenti,
  odjava,
  pred,
  postavke,
  evidencija,
  evidencijaR,
  osoblje,
  pocetna,
  info,
  id,
  stil,
}) {
  const [forma, setForma] = useState(false);
  const [podaci, setPodaci] = useState([]);
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [lozinka_p, setLozinkaP] = useState("");
  const [email, setEmail] = useState("");
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [tip, setTip] = useState("Profesor");
  const [status, setStatus] = useState("Aktivan");
  const [pogreska, setPogreska] = useState(false);

  function pokupiPodatke() {
    if (lozinka != lozinka_p) setPogreska(true);
    else if (
      email === "" ||
      korisnickoIme === "" ||
      lozinka === "" ||
      lozinka_p === ""
    )
      setPogreska(true);
    else {
      axios
        .post("http://127.0.0.1:8000/dws/spasiKorisnika/", {
          ime: ime,
          prezime: prezime,
          lozinka: lozinka,
          email: email,
          korisnickoIme: korisnickoIme,
          status: status,
          tip: tip,
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
  }

  function prikaziFormu() {
    setForma(!forma);
  }
  useEffect(() => {
    ucitaj();
  }, [forma]);

  function ucitaj() {
    axios.post("http://127.0.0.1:8000/dws/sviKorisniciPredmet/").then(
      (response) => {
        console.log(response);
        setPodaci(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
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
            pocetna={pocetna}
            id={id}
            info={info}
            evidencija={evidencija}
            evidencijaRada={evidencijaR}
            korisnici={osoblje}
            postavke={postavke}
            predmeti={pred}
            stil={stil}
          />
        </Col>

        <Col className="nastOsobModal">
          <Row>
            <div className="profesori">
              <h5>Nastavno osoblje</h5>
              <br></br>
              <hr></hr>

              <table className="nasloviZaOsoblje">
                <tr>
                  <th>Ime i prezime</th>
                  <th>Tip korisnika</th>
                  <th>Status</th>
                </tr>
              </table>

              {podaci.map((doc) => {
                return (
                  <>
                    <table
                      className={
                        doc.fields.status === "Neaktivan"
                          ? "crvena1"
                          : doc.fields.status === "Na godišnjem odmoru"
                          ? "zuta"
                          : doc.fields.status === "Na bolovanju"
                          ? "narandzasta"
                          : "zelena1"
                      }
                    >
                      <tr>
                        <td>
                          {doc.fields.ime + " "} {doc.fields.prezime}
                        </td>
                        <td>{doc.fields.tip_korisnika}</td>
                        <td>{doc.fields.status}</td>
                      </tr>
                    </table>
                  </>
                );
              })}
            </div>
          </Row>
          <br />
          <button className="forma_korisnik_button" onClick={prikaziFormu}>
            + Dodaj novog korisnika
          </button>
          {forma ? (
            <Form className="forma_korisnik">
              {pogreska ? (
                <FormLabel>
                  Greska pri unosu lozinke, molimo Vas unesite ponovo.
                </FormLabel>
              ) : (
                <div></div>
              )}

              <Form.Group controlId="formBasicEmail">
                <label>Ime</label>
                <Form.Control
                  type="text"
                  placeholder="Unesite ime"
                  onChange={(event) => setIme(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <label>Prezime</label>
                <Form.Control
                  type="text"
                  placeholder="Unesite prezime"
                  onChange={(event) => setPrezime(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <label>Tip korisnika</label>
                <Form.Control
                  as="select"
                  onChange={(event) => setTip(event.target.value)}
                >
                  <option value="Profesor">Profesor</option>
                  <option value="Asistent">Asistent</option>
                  <option value="Šef odsjeka">Šef odsjeka</option>
                  <option value="Dekan">Dekan</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <label>Status</label>
                <Form.Control
                  as="select"
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="Aktivan">Aktivan</option>
                  <option value="Na bolovanju">Na bolovanju</option>
                  <option value="Na godišnjem odmoru">
                    Na godišnjem odmoru
                  </option>
                  <option value="Neaktivan">Neaktivan</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <label>Korisničko ime</label>
                <Form.Control
                  type="text"
                  placeholder="Unesite korisničko ime"
                  onChange={(event) => setKorisnickoIme(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <label>E-mail adresa</label>
                <Form.Control
                  type="email"
                  placeholder="Unesite e-mail"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <label>Lozinka</label>
                <Form.Control
                  type="password"
                  placeholder="Unesite lozinku"
                  onChange={(event) => setLozinka(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <label>Ponovljena lozinka</label>
                <Form.Control
                  type="password"
                  placeholder="Potvrdite lozinku"
                  onChange={(event) => setLozinkaP(event.target.value)}
                />
              </Form.Group>

              <button variant="primary" onClick={pokupiPodatke}>
                Registruj se
              </button>
            </Form>
          ) : (
            <div></div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default NastavnoOsoblje;