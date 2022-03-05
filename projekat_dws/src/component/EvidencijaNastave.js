import React, { useEffect, useState } from "react";
import { Button, Col, FormLabel, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import EvidencijaPredmet from "./EvidencijaPredmet";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Sidebar from "./Sidebar";
import axios from "axios";

function EvidencijaNastave({
  id,
  pred,
  postavke,
  evidencija,
  evidencijaR,
  osoblje,
  pocetna,
  info,
  odjava,
  stil,
}) {
  const [forma, setForma] = useState(false);
  const [predmet, setPredmet] = useState("");
  const [oblikNastavke, setOblikNastave] = useState("");
  const [sedmica, setSedmica] = useState("");
  const [datum, setDatum] = useState("");
  const [brojStudenata, setBrojStudenata] = useState(0);
  const [pocetak, setPocetak] = useState("");
  const [kraj, setKraj] = useState("");
  const [korisnik, setKorisnik] = useState(0);
  const [podaci, setPodaci] = useState([]);
  const [sviPredmeti, setSviPredmeti] = useState([]);
  const [pogreska, setPogreska] = useState(false);

  useEffect(() => {
    setKorisnik(id);
    predmetiUcitaj();
    procitajPodatke();
  }, [forma]);

  function procitajPodatke() {
    if (info.tip_korisnika != "Šef odsjeka" && info.tip_korisnika != "Dekan") {
      axios
        .post("http://127.0.0.1:8000/dws/ucitajEvidencije/", { korisnik: id })
        .then(
          (response) => {
            console.log(response);
            setPodaci(response.data.evidencije);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      axios.post("http://127.0.0.1:8000/dws/ucitajEvidencijeSve/").then(
        (response) => {
          console.log(response.data);

          setPodaci(response.data.evidencije);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  function filtrirajPoVrsti(vrsta) {
    axios
      .post("http://127.0.0.1:8000/dws/filtrirajEvidencijePoVrsti/", {
        vrsta: vrsta,
      })
      .then(
        (response) => {
          setPodaci(response.data.evidencije);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function filtrirajPoSedmici(sedmicaa) {
    axios
      .post("http://127.0.0.1:8000/dws/filtrirajEvidencijePoSedmici/", {
        sedmica: sedmicaa,
      })
      .then(
        (response) => {
          setPodaci(response.data.evidencije);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function filtrirajPoPredmetu(predmett) {
    axios
      .post("http://127.0.0.1:8000/dws/filtrirajEvidencijePoPredmetu/", {
        predmet: predmett,
      })
      .then(
        (response) => {
          setPodaci(response.data.evidencije);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function predmetiUcitaj() {
    if (
      info.tip_korisnika === "Šef odsjeka" ||
      info.tip_korisnika === "Dekan"
    ) {
      axios.post("http://127.0.0.1:8000/dws/sviPredmetiEvidencija/").then(
        (response) => {
          setSviPredmeti(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      axios
        .post("http://127.0.0.1:8000/dws/PredmetiEvidencija/", { id: id })
        .then(
          (response) => {
            console.log(response);
            setSviPredmeti(response.data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  function predmeti() {
    setForma(!forma);
  }

  function spasiPodatke() {
    if (
      predmet === "" ||
      oblikNastavke === "" ||
      datum === "" ||
      brojStudenata === 0 ||
      pocetak === "" ||
      kraj === "" ||
      sedmica === ""
    ) {
      console.log(
        predmet,
        "*******",
        oblikNastavke,
        "*******",
        datum,
        "*******",
        brojStudenata,
        "*******",
        pocetak,
        "*******",
        kraj,
        "*******",
        sedmica
      );
      setPogreska(true);
    } else {
      setForma(!forma);
      axios
        .post("http://127.0.0.1:8000/dws/dodajEvidenciju/", {
          predmet: predmet,
          oblik_nastave: oblikNastavke,
          datum: datum,
          brojStudenata: brojStudenata,
          pocetak: pocetak,
          kraj: kraj,
          sedmica: sedmica,
          korisnik: korisnik,
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
            evidencija={evidencija}
            evidencijaRada={evidencijaR}
            korisnici={osoblje}
            pocetna={pocetna}
            postavke={postavke}
            predmeti={pred}
            stil={stil}
          />
        </Col>
        <Col>
          <Row>
            <Button variant="success" className="evidencija" onClick={predmeti}>
              + dodaj novu evidenaciju
            </Button>

            <Row>
              <DropdownButton
                className="dropdownBtn"
                id="dropdown-basic-button"
                title="Predmet"
                variant="secondary"
              >
                {sviPredmeti.map((doc) => {
                  return (
                    <Dropdown.Item onClick={() => filtrirajPoPredmetu(doc.pk)}>
                      {doc.fields.naziv}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>

              <DropdownButton
                className="dropdownBtn"
                id="dropdown-basic-button"
                title="Način održavanja"
                variant="secondary"
              >
                <Dropdown.Item onClick={() => filtrirajPoVrsti("Predavanje")}>
                  Predavanje
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoVrsti("Vježbe")}>
                  Vježbe
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => filtrirajPoVrsti("Predavanje i vježbe")}
                >
                  Predavanje i vježbe
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => filtrirajPoVrsti("Auditorne vježbe")}
                >
                  Auditorne vježbe
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => filtrirajPoVrsti("Laboratorijske vježbe")}
                >
                  Laboratorijske vježbe
                </Dropdown.Item>
              </DropdownButton>

              <DropdownButton
                className="dropdownBtn"
                id="dropdown-basic-button"
                title="Sedmica"
                variant="secondary"
              >
                <Dropdown.Item onClick={() => filtrirajPoSedmici(1)}>
                  1
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(2)}>
                  2
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(3)}>
                  3
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(4)}>
                  4
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(5)}>
                  5
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(6)}>
                  6
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(7)}>
                  7
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(8)}>
                  8
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(9)}>
                  9
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(10)}>
                  10
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(11)}>
                  11
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(12)}>
                  12
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(13)}>
                  13
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(14)}>
                  14
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filtrirajPoSedmici(15)}>
                  15
                </Dropdown.Item>
              </DropdownButton>
            </Row>
          </Row>
          {forma ? (
            <Form className="dodajEvidenciju">
              {pogreska ? (
                <label>
                  Greška prilikom unosa podataka, molimo Vas ispravno unesite sve
                  podatke!
                </label>
              ) : (
                <div></div>
              )}
              <Form.Group controlId="formBasicEmail">
                <label>Predmet</label>
                <Form.Control
                  as="select"
                  onChange={(event) => setPredmet(event.target.value)}
                >
                  {sviPredmeti.map((doc) => {
                    return <option value={doc.pk}>{doc.fields.naziv}</option>;
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <label>Oblik nastave</label>
                <Form.Control
                  as="select"
                  onChange={(event) => setOblikNastave(event.target.value)}
                >
                  <option>Predavanje</option>
                  <option>Predavanje i vježbe</option>
                  <option>Vježbe</option>
                  <option>Laboratorijske vježbe</option>
                  <option>Auditorne vježbe</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <label>Datum</label>
                <Form.Control
                  type="date"
                  onChange={(event) => setDatum(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <label>Sedmica</label>
                <Form.Control
                  type="number"
                  min="1"
                  max="15"
                  required="required"
                  onChange={(event) => setSedmica(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <label>Vrijeme početka nastave:</label>
                <Form.Control
                  type="time"
                  onChange={(event) => setPocetak(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <label>Vrijeme kraja nastave:</label>
                <Form.Control
                  type="time"
                  onChange={(event) => setKraj(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <label>Broj studenata :</label>
                <Form.Control
                  type="number"
                  onChange={(event) => setBrojStudenata(event.target.value)}
                />
              </Form.Group>

              <Button variant="success" onClick={spasiPodatke}>
                Sačuvaj
              </Button>
            </Form>
          ) : (
            <div></div>
          )}
          <Row>
            {podaci.map((doc) => {
              return (
                <EvidencijaPredmet
                  key={doc.id}
                  predmet={doc.predmet}
                  sedmica={doc.sedmica}
                  datum={doc.datum}
                  brojStudenata={doc.broj_studenata}
                  vrsta={doc.vrsta}
                  kraj={doc.kraj}
                  pocetak={doc.pocetak}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default EvidencijaNastave;
