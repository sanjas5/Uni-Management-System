import React from "react";
import Predmet from "./Predmet";

function Predmeti({ predmeti, tip }) {
  return (
    <div>
      {predmeti.map((predmet) => {
        return (
          <Predmet
            key={predmet.pk}
            tip={tip}
            prof={predmet.fields.profesor}
            id={predmet.pk}
            naziv={predmet.fields.naziv}
            termin={predmet.fields.termin_predavanja}
            termin_vjezbe={predmet.fields.termin_vjezbi}
          />
        );
      })}
    </div>
  );
}

export default Predmeti;