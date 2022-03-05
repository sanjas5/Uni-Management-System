import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

function ZaboravljenaLozinka() {
  const [email, setEmail] = useState("");
  function posaljiEmail() {
    axios
      .post("http://127.0.0.1:8000/dws/posaljiEmail/", { email: email })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <form className="login">
      <label>
        Ako ste zaboravili lozinku, unesite e-mail kako bismo Vam poslali novu
        lozinku!
      </label>
      <div controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Unesite e-mail"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <button variant="primary" type="submit" onClick={posaljiEmail}>
        Pošalji e-mail
      </button>
    </form>
  );
}

export default ZaboravljenaLozinka;