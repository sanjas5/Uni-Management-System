import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import "./Login.css";
import axios from "axios";

function Login({ registruj, lozinka, pocetna, postavi }) {
  const [ime, setIme] = useState("");
  const [pass, setLozinka] = useState("");
  const [pogresniPodaci, setPogresniPodaci] = useState(false);

  function pokupiPodatke(event) {
    event.preventDefault(); //da nema refresanja stranice

    axios
      .post("http://127.0.0.1:8000/dws/login/", {
        ime: ime,
        lozinka: pass,
      })
      .then(
        (response) => {
          if (response.data === "None") setPogresniPodaci(!pogresniPodaci);
          else {
            let niz = response.data.fields;
            postavi(response.data.pk);
            pocetna(niz, response.data.pk);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <>
      {" "}
      <h1> DOBRO DOŠLI NA APLIKACIJU</h1> <h2> FAKULTETSKA EVIDENCIJA</h2>{" "}
      <div className="login">
        {" "}
        <Form className="loginForm">
          {pogresniPodaci ? <p>Unijeli ste pogešne podatke!</p> : <div></div>}

          <span className="loginTitle">Login</span>

          <Form.Group controlId="formBasicEmail">
            <label>Korisničko ime</label>
            <Form.Control
              type="text"
              className="loginInput"
              placeholder="Unesite korisničko ime"
              onChange={(event) => setIme(event.target.value)}
              required="required"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <label>Lozinka</label>
            <Form.Control
              type="password"
              className="loginInput"
              placeholder="Unesite lozinku"
              onChange={(event) => setLozinka(event.target.value)}
              required="required"
            />
          </Form.Group>

          <button className="loginForgotPass" onClick={lozinka}>
            Zaboravili ste lozinku?
          </button>

          <button className="loginRegisterButton" onClick={registruj}>
            Registrujte se
          </button>

          <button type="submit" onClick={pokupiPodatke}>
            Prijavite se
          </button>
        </Form>
      </div>
    </>
  );
}

export default Login;