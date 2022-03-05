import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./Login.css";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

function RegistrujSe({ odjava, prijava }) {
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
            odjava();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  return (
    <>
      <h1>DOBRO DOŠLI NA APLIKACIJU</h1>
      <h2>FAKULTETSKA EVIDENCIJA</h2>

      <div className="login">
        <form className="registrujSe">
          {pogreska ? (
            <label>
              Greška pri unosu podataka, molimo Vas ispravno popunite formu!
            </label>
          ) : (
            <div></div>
          )}

          <span className="loginTitle">Registracija</span>

          <Form.Group controlId="formBasicEmail">
            <label>Ime</label>
            <Form.Control
              type="text"
              placeholder="Unesite ime"
              onChange={(event) => setIme(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <label>Prezime</label>
            <Form.Control
              type="text"
              placeholder="Unesite prezime"
              onChange={(event) => setPrezime(event.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <label>Tip korisnika </label>
            <Form.Control
              as="select"
              onChange={(event) => setTip(event.target.value)}
            >
              <option value="Profesor">Profesor</option>
              <option value="Asistent">Asistent</option>
              <option value="Šef odsjeka">Šef odsjeka</option>
              <option value="Dekan"> Dekan</option>
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
              <option value="Na godišnjem odmoru">Na godišnjem odmoru</option>
              <option value="Neaktivan"> Neaktivan</option>
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
              placeholder="Unesite email"
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
            Registrujte se
          </button>
        </form>

        <button
          className="loginRegisterButton"
          variant="primary"
          onClick={(event) => (window.location.href = "/Login")}
        >
          Prijavite se
        </button>
      </div>
    </>
  );
}

export default RegistrujSe;