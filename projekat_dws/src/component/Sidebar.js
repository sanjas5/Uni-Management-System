import React from "react";
import { SidebarData } from "./SidebarData";

function Sidebar({
  pocetna,
  evidencija,
  evidencijaRada,
  korisnici,
  postavke,
  predmeti,
  stil,
  tip,
  id,
  info,
}) {
  return (
    <div className="sidebar">
      <ul className="sideBarList">
        <li className="sidebarlistitem" onClick={() => pocetna(info, id)}>
          Početna stranica
        </li>
        <li className="sidebarlistitem" onClick={evidencija}>
          Evidencija održane nastave
        </li>
        <li className="sidebarlistitem" onClick={evidencijaRada}>
          Evidencija rada od kuće
        </li>
        {tip === "Šef odsjeka" || tip === "Dekan" ? (
          <li className="sidebarlistitem" onClick={korisnici}>
            Korisnici
          </li>
        ) : (
          <div></div>
        )}
        <li className="sidebarlistitem" onClick={predmeti}>
          Predmeti{" "}
        </li>
        <li className="sidebarlistitem" onClick={postavke}>
          Postavke{" "}
        </li>
        <li
          onClick={(event) => (window.location.href = "/Stil")}
          className="sidebarlistitem"
        >
          Stil
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
