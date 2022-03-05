import json
from django.conf import settings
from django.core import serializers
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.core.mail import send_mail

from dws.models import Korisnik, Predmet, Evidencija, RadOdKuce


@api_view(['POST'])
def posalji_email(request):
    email = request.data.get('email')
    print(email)
    korisnik = Korisnik.objects.get(email=email)
    print(korisnik.sifra)
    subject = "DWS projekat"
    nova_sifra = korisnik.sifra + '123'
    korisnik.sifra = nova_sifra
    korisnik.save()
    poruka = "Vaša nova lozinka je: '" + nova_sifra + "'"
    print(poruka)
    from_email = settings.EMAIL_HOST_USER
    to_emails = [email]

    send_mail(subject, poruka, from_email, to_emails, fail_silently=False)
    return HttpResponse("Hello, world. You're at the polls index.")

@api_view(['POST'])
def index(request):
    ime = request.data.get('ime')
    lozinka = request.data.get('lozinka')
    print(ime)
    return HttpResponse("Hello, world. You're at the polls index.")

@api_view(['GET'])
def korisnici(request):
    lista_korisnika = Korisnik.objects.all()
    res = serializers.serialize('json',lista_korisnika)
    return HttpResponse(res)

@api_view(['POST'])
def login(request):
    data = request.data
    ime = data.get('ime')
    lozinka = data.get('lozinka')
    try:
        korisnik = Korisnik.objects.get(sifra=lozinka,korisnicko_ime=ime)
        res = serializers.serialize('json', [korisnik, ])
        st = json.loads(res)
        data = json.dumps(st[0])
        return HttpResponse(data)

    except Korisnik.DoesNotExist:
        korisnik = None
    return HttpResponse(korisnik)

@api_view(['POST'])
def spasiKorisnika(request):
    data = request.data
    ime = data.get('ime')
    prezime = data.get('prezime')
    lozinka = data.get('lozinka')
    email = data.get('email')
    korisnickoIme = data.get('korisnickoIme')
    tip = data.get('tip')
    status = data.get('status')
    Korisnik.objects.create(ime=ime, prezime=prezime, sifra=lozinka, email=email, korisnicko_ime=korisnickoIme,
                            slika=" ", status=status, tip_korisnika=tip)
    return HttpResponse("success")

@api_view(['POST'])
def ucitajPredmete(request):
    id = request.data.get('id')
    predmeti = Predmet.objects.filter(Q(profesor_id=id)|Q(asistent_id=id))
    res = serializers.serialize('json', predmeti)
    # st = json.loads(res)
    # data = json.dumps(st[0])
    return HttpResponse(res)

@api_view(['POST'])
def ucitajPredmeteSve(request):
    id = request.data.get('id')
    predmeti = Predmet.objects.all()
    res = serializers.serialize('json', predmeti)
    return HttpResponse(res)

@api_view(['POST'])
def ucitajDodatneInfoPredmeta(request):
    predmet = request.data.get('predmet')
    profesor = request.data.get('profesor')
    predmeti = Evidencija.objects.filter(korisnik_id=profesor, predmet_id=predmet)
    res = serializers.serialize('json', predmeti)
    # st = json.loads(res)
    # data = json.dumps(st[0])
    return HttpResponse(res)

@api_view(['POST'])
def dodajEvidenciju(request):
    data = request.data
    predmet = data.get('predmet')
    korisnik = data.get('korisnik')
    oblik_nastave = data.get('oblik_nastave')
    datum = data.get('datum')
    pocetak = data.get('pocetak')
    kraj = data.get('kraj')
    sedmica = data.get('sedmica')
    brojStudenata = data.get('brojStudenata')
    Evidencija.objects.create(datum=datum, vrsta=oblik_nastave, korisnik_id=korisnik, predmet_id=predmet,
                              pocetak=pocetak, kraj=kraj, sedmica=sedmica, broj_studenata=brojStudenata)
    return HttpResponse("success")

@api_view(['POST'])
def ucitajEvidencije(request):

    korisnik = request.data.get('korisnik')
    predmet = Predmet.objects.all()

    evidencije = Evidencija.objects.select_related("predmet").filter(korisnik_id=korisnik)
    lista = []
    for evidencija in evidencije:
        lista.append({'datum': evidencija.datum, 'predmet': evidencija.predmet.naziv, 'vrsta': evidencija.vrsta,
                      'pocetak': evidencija.pocetak, 'kraj': evidencija.kraj, 'sedmica':evidencija.sedmica,
                      'broj_studenata': evidencija.broj_studenata, 'id':evidencija.id})

    return JsonResponse({"evidencije": lista})



@api_view(['POST'])
def filtrirajEvidencijePoVrsti(request):

    vrsta = request.data.get('vrsta')
    evidencije = Evidencija.objects.select_related('predmet').filter(vrsta=vrsta)
    lista = []

    for evidencija in evidencije:
        lista.append({'datum': evidencija.datum, 'predmet': evidencija.predmet.naziv, 'vrsta': evidencija.vrsta,
                      'pocetak': evidencija.pocetak, 'kraj': evidencija.kraj, 'sedmica': evidencija.sedmica,
                      'broj_studenata': evidencija.broj_studenata,'id':evidencija.id})

    return JsonResponse({"evidencije": lista})

@api_view(['POST'])
def filtrirajEvidencijePoSedmici(request):
    sedmica = request.data.get('sedmica')
    evidencije = Evidencija.objects.select_related('predmet').filter(sedmica=sedmica)
    lista = []

    for evidencija in evidencije:
        lista.append({'datum': evidencija.datum, 'predmet': evidencija.predmet.naziv, 'vrsta': evidencija.vrsta,
                      'pocetak': evidencija.pocetak, 'kraj': evidencija.kraj, 'sedmica': evidencija.sedmica,
                      'broj_studenata': evidencija.broj_studenata,'id':evidencija.id})

    return JsonResponse({"evidencije": lista})

@api_view(['POST'])
def filtrirajEvidencijePoPredmetu(request):
    predmet = request.data.get('predmet')
    evidencije = Evidencija.objects.select_related('predmet').filter(predmet_id=predmet)
    lista = []

    for evidencija in evidencije:
        lista.append({'datum': evidencija.datum, 'predmet': evidencija.predmet.naziv, 'vrsta': evidencija.vrsta,
                      'pocetak': evidencija.pocetak, 'kraj': evidencija.kraj, 'sedmica': evidencija.sedmica,
                      'broj_studenata': evidencija.broj_studenata,'id':evidencija.id})

    return JsonResponse({"evidencije": lista})

@api_view(['POST'])
def ucitajEvidencijeSve(request):

    evidencije = Evidencija.objects.select_related('predmet').all()
    lista = []

    for evidencija in evidencije:
        lista.append({'datum': evidencija.datum, 'predmet': evidencija.predmet.naziv, 'vrsta': evidencija.vrsta,
                      'pocetak': evidencija.pocetak, 'kraj': evidencija.kraj, 'sedmica': evidencija.sedmica,
                      'broj_studenata': evidencija.broj_studenata,'id':evidencija.id})

    return JsonResponse({"evidencije": lista})

@api_view(['POST'])
def spasiZahtjev(request):
    data = request.data
    korisnik = data.get('korisnik')
    datum = data.get('datum')
    razlozi = data.get('razlozi')
    zahtjev = "Na čekanju"
    RadOdKuce.objects.create(zahtjev=zahtjev, korisnik_id=korisnik, datum=datum, razlozi=razlozi, predmet_id=1)
    return HttpResponse("success")

@api_view(['POST'])
def spasiZahtjevSef(request):
    data = request.data
    korisnik = data.get('korisnik')
    datum = data.get('datum')
    razlozi = data.get('razlozi')
    zahtjev = "Odobren"
    RadOdKuce.objects.create(zahtjev=zahtjev, korisnik_id=korisnik, datum=datum, razlozi=razlozi, predmet_id=1)
    return HttpResponse("success")

@api_view(['POST'])
def ucitajZahtjeve(request):
    korisnik = request.data.get('korisnik')
    print(korisnik)
    zahtjevi = RadOdKuce.objects.filter(korisnik_id=korisnik)
    res = serializers.serialize('json', zahtjevi)
    return HttpResponse(res)

@api_view(['POST'])
def sefZahtjevi(request):

    zahtjevi = RadOdKuce.objects.filter(zahtjev="Na čekanju").order_by("datum")
    res = serializers.serialize('json', zahtjevi)
    return HttpResponse(res)

@api_view(['POST'])
def odobreniZahtjevi(request):
    zahtjevi = RadOdKuce.objects.select_related('korisnik').filter(zahtjev="Odobren")
    lista = []

    for zahtjev in zahtjevi:
        lista.append({'datum': zahtjev.datum, 'korisnik': zahtjev.korisnik.ime + " " + zahtjev.korisnik.prezime,
                       'id': zahtjev.id})

    return JsonResponse({"zahtjevi": lista})

@api_view(['POST'])
def ucitajKorisnike(request):
    korisnici = Korisnik.objects.all()
    res = serializers.serialize('json', korisnici)
    return HttpResponse(res)

@api_view(['POST'])
def obradiZahtjev(request):
    status = request.data.get('status')
    id = request.data.get('id')
    zahtjevi = RadOdKuce.objects.get(id=id)
    zahtjevi.zahtjev = status
    zahtjevi.save()

    return HttpResponse("success")
@api_view(['POST'])
def postavke(request):
    data = request.data
    id = data.get('korisnik')
    korisnik = Korisnik.objects.filter(id=id)
    res = serializers.serialize('json', korisnik)
    return HttpResponse(res)

@api_view(['POST'])
def promijeniKorisnika(request):
    data = request.data
    id = data.get('id')
    ime = data.get('ime')
    prezime = data.get('prezime')
    lozinka = data.get('lozinka')
    status = data.get('status')
    zahtjevi = Korisnik.objects.get(id=id)
    zahtjevi.ime = ime
    zahtjevi.prezime = prezime
    zahtjevi.sifra = lozinka
    zahtjevi.status = status
    zahtjevi.save()
    return HttpResponse("success")

@api_view(['POST'])
def ucitajSvePredmete(request):
    predmet = Predmet.objects.select_related('profesor', 'asistent').all()
    lista = []
    for pred in predmet:
        lista.append({'profesor_ime': pred.profesor.ime + " " + pred.profesor.prezime, 'naziv': pred.naziv,
                      'asistent_ime': pred.asistent.ime + " " + pred.asistent.prezime,
                      'termin_predavanja': pred.termin_predavanja, 'termin_vjezbe': pred.termin_vjezbi,
                      'id': pred.id})

    return JsonResponse({"predmeti": lista})

@api_view(['POST'])
def ucitajNekePredmete(request):
    data = request.data
    id = data.get('id')
    predmet = Predmet.objects.select_related('profesor','asistent').filter(Q(profesor_id=id)|Q(asistent_id=id))

    lista = []
    for pred in predmet:
        lista.append({'profesor_ime': pred.profesor.ime +" " +pred.profesor.prezime, 'naziv': pred.naziv, 'asistent_ime': pred.asistent.ime +" "+pred.asistent.prezime,
                      'termin_predavanja': pred.termin_predavanja, 'termin_vjezbe': pred.termin_vjezbi,
                       'id':pred.id})

    return JsonResponse({"predmeti": lista})
    # res = serializers.serialize('json', predmet)
    # return HttpResponse(res)

@api_view(['POST'])
def sviKorisniciPredmet(request):
    korisnici = Korisnik.objects.all()
    res = serializers.serialize('json', korisnici)
    return HttpResponse(res)

@api_view(['POST'])
def dodajNoviPredmet(request):
    data = request.data
    naziv = data.get('naziv')
    profesor = data.get('profesor')
    asistent = data.get('asistent')
    vjezbe = data.get('vjezbe')
    predavanja = data.get('predavanje')
    godina = data.get('godina')
    semestar = data.get('semestar')
    Predmet.objects.create(naziv=naziv, profesor_id=profesor, asistent_id=asistent, termin_predavanja=predavanja,
                           termin_vjezbi=vjezbe, semestar=semestar, godina=godina)
    return HttpResponse("success")

@api_view(['POST'])
def promijeniPredmet(request):
    data = request.data
    naziv = data.get('naziv')
    profesor = data.get('profesor')
    asistent = data.get('asistent')
    vjezbe = data.get('vjezbe')
    predavanja = data.get('predavanje')
    godina = data.get('godina')
    semestar = data.get('semestar')
    id = data.get('id')
    zahtjevi = Predmet.objects.get(id=id)
    zahtjevi.naziv = naziv
    zahtjevi.profesor_id = profesor
    zahtjevi.asistent_id = asistent
    zahtjevi.termin_vjezbi = vjezbe
    zahtjevi.godina = godina
    zahtjevi.semestar = semestar
    zahtjevi.termin_predavanja = predavanja
    zahtjevi.save()
    return HttpResponse("succes")

@api_view(['POST'])
def izbrisiPredmet(request):
    data = request.data
    id = data.get('id')
    Predmet.objects.filter(id=id).delete()
    return HttpResponse("succes")

@api_view(['POST'])
def predmetEvidencijaDodatno(request):
    data = request.data
    id = data.get('id')
    evidencije = Evidencija.objects.filter(predmet_id=id).order_by('sedmica')
    res = serializers.serialize('json', evidencije)
    return HttpResponse(res)

@api_view(['POST'])
def sviPredmetiEvidencija(request):
    evidencije = Predmet.objects.all()
    res = serializers.serialize('json', evidencije)
    return HttpResponse(res)

@api_view(['POST'])
def PredmetiEvidencija(request):
    data = request.data
    id = data.get('id')
    evidencije = Predmet.objects.filter(Q(profesor_id=id)|Q(asistent_id=id))
    res = serializers.serialize('json', evidencije)
    return HttpResponse(res)

