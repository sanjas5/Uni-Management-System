from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('korisnici/', views.korisnici, name='korisnici'),
    path('spasiKorisnika/', views.spasiKorisnika, name='spasiKorisnici'),
    path('login/', views.login, name='login'),
    path('ucitajPredmete/', views.ucitajPredmete, name='ucitajPredmete'),
    path('ucitajPredmeteSve/', views.ucitajPredmeteSve, name='ucitajPredmeteSve'),
    path('ucitajDodatneInfoPredmeta/', views.ucitajDodatneInfoPredmeta, name='ucitajDodatneInfoPredmeta'),
    path('dodajEvidenciju/', views.dodajEvidenciju, name='dodajEvidenciju'),
    path('ucitajEvidencije/', views.ucitajEvidencije, name='ucitajEvidencije'),
    path('ucitajEvidencijeSve/', views.ucitajEvidencijeSve, name='ucitajEvidencije'),
    path('filtrirajEvidencijePoVrsti/', views.filtrirajEvidencijePoVrsti, name='filtrirajEvidencijePoVrsti'),
    path('filtrirajEvidencijePoSedmici/', views.filtrirajEvidencijePoSedmici, name='filtrirajEvidencijePoSedmici'),
    path('filtrirajEvidencijePoPredmetu/', views.filtrirajEvidencijePoPredmetu, name='filtrirajEvidencijePoPredmetu'),
    path('spasiZahtjev/', views.spasiZahtjev, name='spasiZahtjev'),
    path('spasiZahtjevSef/', views.spasiZahtjevSef, name='spasiZahtjevSef'),
    path('ucitajZahtjeve/', views.ucitajZahtjeve, name='ucitajZahtjeve'),
    path('sefZahtjevi/', views.sefZahtjevi, name='sefZahtjevi'),
    path('odobreniZahtjevi/', views.odobreniZahtjevi, name='odobreniZahtjevi'),
    path('odobriOdbij/', views.obradiZahtjev, name='obradiZahtjev'),
    path('ucitajKorisnike/', views.ucitajKorisnike, name='ucitajKorisnike'),
    path('Postavke/', views.postavke, name='postavke'),
    path('promijeniKorisnika/', views.promijeniKorisnika, name='promijeniKorisnika'),
    path('ucitajSvePredmete/', views.ucitajSvePredmete, name='ucitajSvePredmete'),
    path('ucitajNekePredmete/', views.ucitajNekePredmete, name='ucitajNekePredmete'),
    path('sviKorisniciPredmet/', views.sviKorisniciPredmet, name='sviKorisniciPredmet'),
    path('dodajNoviPredmet/', views.dodajNoviPredmet, name='dodajNoviPredmet'),
    path('promijeniPredmet/', views.promijeniPredmet, name='promijeniPredmet'),
    path('izbrisiPredmet/', views.izbrisiPredmet, name='izbrisiPredmet'),
    path('predmetEvidencijaDodatno/', views.predmetEvidencijaDodatno, name='predmetEvidencijaDodatno'),
    path('sviPredmetiEvidencija/', views.sviPredmetiEvidencija, name='sviPredmetiEvidencija'),
    path('PredmetiEvidencija/', views.PredmetiEvidencija, name='PredmetiEvidencija'),
    path('posaljiEmail/', views.posalji_email, name='posaljiEmail'),

]