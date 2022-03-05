import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import {Button, Col, Container, Row} from "react-bootstrap";
import FormaPostavke from "./FormaPostavke";
import PostavkeKartice from "./PostavkeKartice";
import Sidebar from "./Sidebar";
import axios from "axios";

function Postavke({
    id,
    odjava,
    pred,
    postavke,
    evidencija,
    evidencijaR,
    osoblje,
    pocetna,
    info,
    stil
}) {
    const [korisnik, setKorisnik] = useState([])
    const [podaci, setPodaci] = useState([])
    const [promjena, setPromjena] = useState(0)
    useEffect(() => {
        ucitajPodatke()
    }, [promjena])

    function ucitajPodatke() {
        console.log(id)
        axios
            .post('http://127.0.0.1:8000/dws/Postavke/', {korisnik: id})
            .then((response) => {

                console.log(response.data)
                setPodaci(response.data)
                console.log(podaci)
                setKorisnik(response.data)

                var niz = response.data
                setKorisnik(niz)
                console.log(korisnik)
            }, (error) => {
                console.log(error)
            })

    }

    return (
        <div>
            <NavBar
                ime={info.ime}
                prezime={info.prezime}
                status={info.status}
                odjava={odjava}
               />

            <Row>
                <Col xs={3}>
                    <Sidebar
                        id={id}
                        pocetna={pocetna}
                        info={info}
                        tip={info.tip_korisnika}
                        evidencija={evidencija}
                        evidencijaRada={evidencijaR}
                        korisnici={osoblje}
                        postavke={postavke}
                        predmeti={pred}
                        stil={stil}/></Col>
                <Col xs={4}>
                    {
                        korisnik.map((doc) => {
                            return <PostavkeKartice
                                key={doc.pk}
                                id={doc.pk}
                                ime={doc.fields.ime}
                                prezime={doc.fields.prezime}
                                status={doc.fields.status}
                                tip={doc.fields.tip_korisnika}
                                sifra={doc.fields.sifra}
                                promjena={setPromjena}/>
                        })

                    }

                </Col>
            </Row>

        </div>
    )
}

export default Postavke