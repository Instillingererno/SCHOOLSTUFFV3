var kursTab = [];

var kurs = function(Landkode, Kurs, Faktor) {
    this.Landkode = Landkode;
    this.Kurs = Kurs;
    this.Faktor = Faktor;
}

function kursTilTab() {
    try {
        kursTab = JSON.parse(localStorage.getItem("kurser"));
    }
    catch(e) {
        kursTab = [];
    }
}

function lagreTilFil() {
    if(typeof (Storage) !== "undefined") {
        localStorage.setItem("kurser", JSON.stringify(kursTab));
    }
    else {
        alert("Nettleseren du bruker har ikke støtte for lagring av filer. Vennligst bytt nettleser, facking scrub.")
    }
}