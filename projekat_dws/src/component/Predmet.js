import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./Login.css";

function MyVerticallyCenteredModal(props) {
  const [dodatniPodaci, setDodatniPodaci] = useState([]);
  useEffect(() => {
    ucitaj();
  }, []);

  function ucitaj() {
    axios
      .post("http://127.0.0.1:8000/dws/predmetEvidencijaDodatno/", {
        id: props.id,
      })
      .then(
        (response) => {
          setDodatniPodaci(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered="centered"
    >
      <Modal.Header closeButton="closeButton">
        <Modal.Title id="contained-modal-title-vcenter">
          Pregled predmeta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dodatniPodaci.map((doc) => {
          return (
            <div key={doc.pk}>
              <b>Sedmica: </b>
              console.log(doc.fields.sedmica)
              {doc.fields.sedmica}
              <span className="modul">
                <b>Datum: </b>
                {doc.fields.datum}
              </span>
              <span className="modul">
                <b>Broj studenata: </b>
                {doc.fields.broj_studenata}
              </span>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button className="zatvori" onClick={props.onHide}>
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Predmet({ naziv, vrsta, termin, id, prof, termin_vjezbe, tip }) {
  const [modal, setModal] = useState(false);
  const [evidencija, setEvidencija] = useState([]);

  function prikazi() {
    axios
      .post("http://127.0.0.1:8000/dws/ucitajDodatneInfoPredmeta/", {
        predmet: id,
        profesor: prof,
      })
      .then(
        (response) => {
          console.log(response.data);
          setEvidencija(response.data);
          setModal(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="predmet">
      <div>
        <h3>
          <u>Naziv:</u>
          <b>{" " + naziv}</b>
        </h3>
        {tip === "Profesor" ? (
          <p>Termin održavanja predavanja: {termin}</p>
        ) : (
          <p>
            <u>Termin održavanja vježbi:</u>
            {" " + termin_vjezbe}h
          </p>
        )}
        <button className="pregled" onClick={prikazi}>
          Pregled
        </button>
        <MyVerticallyCenteredModal
          id={id}
          show={modal}
          onHide={() => setModal(false)}
        />
      </div>
    </div>
  );
}

export default Predmet;