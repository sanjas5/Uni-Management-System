import React from "react";

function EvidencijaPredmet({
  predmet,
  sedmica,
  datum,
  vrsta,
  pocetak,
  kraj,
  brojStudenata,
}) {
  return (
    <div className="predmetEvidencija">
      <p>Naziv predmeta: {predmet}</p>
      <p>Sedmica: {sedmica}</p>
      <p>Datum održavanja: {datum}</p>
      <p>Oblik nastave: {vrsta}</p>
      <p>Vrijeme početka nastave: {pocetak}</p>
      <p>Vrijeme kraja nastave: {kraj}</p>
      <p>Broj prisutnih studenata: {brojStudenata}</p>
    </div>
  );
}

export default EvidencijaPredmet;
