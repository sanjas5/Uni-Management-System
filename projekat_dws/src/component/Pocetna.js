import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Predmeti from "./Predmeti";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./Pocetna.css";

function Pocetna({
  podaci,
  id,
  odjava,
  pred,
  postavke,
  evidencija,
  evidencijaR,
  osoblje,
  pocetna,
  stil,
}) {
  const [predmeti, setPredmeti] = useState([]);

  function ucitajPredmete() {
    if (
      podaci.tip_korisnika != "Šef odsjeka" &&
      podaci.tip_korisnika != "Dekan"
    ) {
      axios.post("http://127.0.0.1:8000/dws/ucitajPredmete/", { id: id }).then(
        (response) => {
          console.log(response.data);
          setPredmeti(response.data);
          console.log(predmeti);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      axios.post("http://127.0.0.1:8000/dws/ucitajPredmeteSve/").then(
        (response) => {
          console.log(response.data);
          setPredmeti(response.data);
          console.log(predmeti);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  useEffect(() => {
    ucitajPredmete();
  }, []);
  return (
    <div>
      <NavBar
        odjava={odjava}
        ime={podaci.ime}
        prezime={podaci.prezime}
        status={podaci.status}
      />

      <div>
        <div>
          <Sidebar
            tip={podaci.tip_korisnika}
            evidencija={evidencija}
            evidencijaRada={evidencijaR}
            korisnici={osoblje}
            postavke={postavke}
            predmeti={pred}
            stil={stil}
          />
        </div>

        <div className="prikazPredmeta">
          <Predmeti predmeti={predmeti} tip={podaci.tip_korisnika} />
        </div>
      </div>
    </div>
  );
}

export default Pocetna;