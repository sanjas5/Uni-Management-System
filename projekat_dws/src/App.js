import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./component/Pocetna.css"
import "./component/Login.css"
import Login from "./component/Login";
import RegistrujSe from "./component/RegistrujSe";
import ZaboravljenaLozinka from "./component/ZaboravljenaLozinka";
import {useState} from "react";
import NavBar from "./component/NavBar";
import Pocetna from "./component/Pocetna";
import EvidencijaNastave from "./component/EvidencijaNastave";
import EvidencijaRadaOdKuce from "./component/EvidencijaRadaOdKuce";
import PredmetInformacije from "./component/PredmetInformacije";
import PredmetiInformacije from "./component/PredmetiInformacije";
import NastavnoOsoblje from "./component/NastavnoOsoblje";
import Postavke from "./component/Postavke";
import Sidebar from "./component/Sidebar";
import PostavkeKartice from "./component/PostavkeKartice";
import Stil from "./component/Stil";


function App() {
    const [registrujSe,setRegistrujSe] = useState(false)
    const [zaboravljenaLozinka,setzaboravljenaLozinka] = useState(false)
    const [pocetnaStranica,setPocetnaStranica] = useState(false)
    const [evidencijaNastave,setEvidencijaNastave] = useState(false)
    const [evidencijaRada,setEvidencijaRada] = useState(false)
    const [postavke,setPostavke] = useState(false)
    const [stil,setStil] = useState(false)
    const [predmetiInformacije,setPredmetiInformacije] = useState(false)
    const [nastavnoOsoblje,setNastavnoOsoblje] = useState(false)
    const [podaci,setPodaci] = useState([])
    const [id,setId] = useState(0)

    
   
    function pocetna(niz,idi){
        setId(idi)
        setPodaci(niz)
        console.log(id)
        setPocetnaStranica(true)
    }
    function registar(){
        setRegistrujSe(true)
        setzaboravljenaLozinka(false)
    }
    function prijava(){
        setPocetnaStranica(true)
    }
     function zaboravljena_lozinka(){
        setRegistrujSe(false)
        setzaboravljenaLozinka(true)
    }
    function evidencija(){
        setEvidencijaNastave(true)
        setPocetnaStranica(false)
        setEvidencijaRada(false)
        setPredmetiInformacije(false)
        setNastavnoOsoblje(false)
        setPostavke(false)
        setStil(false)
    }
    function evidencijaR(){
        setEvidencijaNastave(false)
        setPocetnaStranica(false)
        setEvidencijaRada(true)
        setPredmetiInformacije(false)
        setNastavnoOsoblje(false)
        setPostavke(false)
        setStil(false)
    }
    function predmeti(){
        setEvidencijaNastave(false)
        setPocetnaStranica(false)
        setEvidencijaRada(false)
        setPredmetiInformacije(true)
        setNastavnoOsoblje(false)
        setPostavke(false)
        setStil(false)
    }
    function post(){
        setEvidencijaNastave(false)
        setPocetnaStranica(false)
        setEvidencijaRada(false)
        setPredmetiInformacije(false)
        setNastavnoOsoblje(false)
        setPostavke(true)
        setStil(false)
    }
    function osoblje(){
        setEvidencijaNastave(false)
        setPocetnaStranica(false)
        setEvidencijaRada(false)
        setPredmetiInformacije(false)
        setNastavnoOsoblje(true)
        setPostavke(false)
        setStil(false)
    }
    function odjava(){
        setEvidencijaNastave(false)
        setPocetnaStranica(false)
        setEvidencijaRada(false)
        setPredmetiInformacije(false)
        setNastavnoOsoblje(false)
        setPostavke(false)
        setRegistrujSe(false)
        setzaboravljenaLozinka(false)
        setStil(false)
    }
    
    if(registrujSe){
        return (
            <RegistrujSe odjava={odjava} prijava={prijava}/>
        )
    }
    else if(zaboravljenaLozinka){
        return <ZaboravljenaLozinka odjava={odjava}/>
    }
    else if(pocetnaStranica){
        return <Pocetna id={id} odjava={odjava} pocetna={pocetna} podaci={podaci}  pred={predmeti} evidencija={evidencija} evidencijaR={evidencijaR} postavke={post} osoblje={osoblje} stil={stil}/>
    }
    else if(evidencijaNastave){
        return <EvidencijaNastave id={id} odjava={odjava} pocetna={pocetna} info={podaci}  pred={predmeti} evidencija={evidencija} evidencijaR={evidencijaR} postavke={post} osoblje={osoblje} stil={stil}/>
    }
    else if(nastavnoOsoblje){
        return <NastavnoOsoblje id={id} odjava={odjava} pocetna={pocetna} info={podaci}  pred={predmeti} evidencija={evidencija} evidencijaR={evidencijaR} postavke={post} osoblje={osoblje} stil={stil}/>
    }
    else if(evidencijaRada){
        return <EvidencijaRadaOdKuce id={id} tip={podaci.tip_korisnika} odjava={odjava} pocetna={pocetna} info={podaci}  pred={predmeti} evidencija={evidencija} evidencijaR={evidencijaR} postavke={post} osoblje={osoblje} stil={stil}/>
    }
    else if(predmetiInformacije){
        return <PredmetiInformacije id={id} tip={podaci.tip_korisnika} odjava={odjava} pocetna={pocetna} info={podaci}  pred={predmeti} evidencija={evidencija} evidencijaR={evidencijaR} postavke={post} osobljee={osoblje} stil={stil}/>
    }
    else if(postavke){
        return <Postavke id={id} odjava={odjava} pocetna={pocetna} info={podaci}  pred={predmeti} evidencija={evidencija} evidencijaR={evidencijaR} postavke={post} osoblje={osoblje} stil={stil}/>
    }
    else if(stil){
        return <Stil stil={stil}/>
    }

  return (

        <div className="default">
             <Login registruj={registar} lozinka={zaboravljena_lozinka} pocetna={pocetna} postavi={setId}/>

        </div>

  );
}

export default App;
