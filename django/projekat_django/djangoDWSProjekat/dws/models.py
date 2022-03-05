from django.db import models



class Korisnik(models.Model):
    ime = models.CharField(max_length=20)
    prezime = models.CharField(max_length=20)
    korisnicko_ime = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    sifra = models.CharField(max_length=30)
    tip_korisnika = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    slika = models.CharField(max_length=50,default=" ")



class Predmet(models.Model):
    naziv = models.CharField(max_length=50)
    profesor = models.ForeignKey(Korisnik, on_delete=models.CASCADE, related_name='profesor')
    asistent = models.ForeignKey(Korisnik, on_delete=models.CASCADE, related_name='asistent')
    termin_predavanja = models.TimeField(auto_now_add=False)
    termin_vjezbi = models.TimeField(auto_now_add=False)
    godina = models.IntegerField()
    semestar = models.IntegerField()

class Evidencija(models.Model):
    korisnik = models.ForeignKey(Korisnik,on_delete=models.CASCADE)
    predmet = models.ForeignKey(Predmet,on_delete=models.CASCADE)
    datum = models.DateField()
    vrsta = models.CharField(max_length=30)
    pocetak = models.TimeField(auto_now_add=False)
    kraj = models.TimeField(auto_now_add=False)
    broj_studenata = models.IntegerField()
    sedmica = models.IntegerField()


class RadOdKuce(models.Model):
    korisnik = models.ForeignKey(Korisnik, on_delete=models.CASCADE)
    predmet = models.ForeignKey(Predmet, on_delete=models.CASCADE)
    zahtjev = models.CharField(max_length=20)
    datum = models.DateField()
    razlozi = models.CharField(max_length=200)



