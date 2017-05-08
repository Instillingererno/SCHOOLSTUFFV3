var Data = [];

function fileLoad(filNavn) {
    //"^"For oppgave tekst, "§" for media fil, "*" for rett svar
    var linje;
    var felt;
    var spors = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            linje = xhttp.responseText.split("\n");
            for (var i = 0; i < linje.length; i++) {
                spors.push([]);
                felt = linje[i].split(";");
                for (var j = 0; j < felt.length; j++) {
                    spors[i].push(felt[j]);
                }
            }
        }
    };
    xhttp.open("GET", filNavn, false);
    xhttp.send();
    filBehandle(spors);
}

function filBehandle(data) {
    //Funksjon for å lage et object med navn og lignende, den sorterer tekst filen
    for (var i = 0; i < data.length; i++) {
        var spors = "",
            tekst = [],
            rett = [],
            alt = [],
            media = [];
        spors = data[i][0];
        for (var j = 1; j < data[i].length; j++) {
            if (data[i][j].substr(0, 1) == "^")
                tekst.push(data[i][j].substr(1, data[i][j].length - 1));
            else if (data[i][j].substr(0, 1) == "§")
                media.push(data[i][j].substr(1, data[i][j].length - 1));
            else if (data[i][j].substr(0, 1) == "*") {
                rett.push(data[i][j].substr(1, data[i][j].length - 1));
                alt.push(data[i][j].substr(1, data[i][j].length - 1));
            } else
                alt.push(data[i][j]);
        }
        Data.push(new filKlasse(spors, tekst, rett, alt, media));
    }
}


var filKlasse = function (spors, tekst, rett, alt, media) {
    this.spors = spors;
    this.tekst = tekst;
    this.rett = rett;
    this.alt = alt;
    this.media = media;
}

//Forbeholdt Oppgave2.cshtml

var naa = 0;
var valgtspraak;
var poeng = 0;
var fileload = false;

var spraak = {
    "Amerikansk": "/USAtest.txt",
    "Svensk": "Finnes ikke",
    "Britisk": "Finnes ikke",
    "Indisk-Engelsk": "Finnes ikke",
    "Laosisk": "Finnes ikke",
    "Mandarin": "Finnes ikke",
    "Apelsin": "Finnes ikke"
};

function oppgave2Load() {
    var div = document.getElementById("spraakValg");
    var liste = "";
    for (var i = 0; i < Object.keys(spraak).length; i++) {
        liste += "<input type='button' value='" + Object.keys(spraak)[i] + "' onclick='(valg(this.value))' />";
    }
    div.innerHTML += liste;
}

function valg(alternativ) {
    valgtspraak = alternativ;
    if (!fileload) {
        fileLoad(spraak[alternativ]);
        fileload = true;
    }
    var table = document.getElementById("Spraaktest");
    var htmldom = "";
    htmldom += "<h2>" + Data[naa].spors + "</h2>";
    if (Data[naa].media.length > 0)
        htmldom += "<audio controls><source src='" + Data[naa].media + "' type='audio/mpeg' /></audio><br />";
    if (Data[naa].tekst.length > 0)
        htmldom += "<span>" + Data[naa].tekst + "</span><br />";
    if (Data[naa].rett.length > 1) {
        for (var i = 0; i < Data[naa].alt.length; i++) {
            htmldom += "<input id='" + i + "' type='checkbox' name='alternativ' value='" + Data[naa].alt[i] + "'/>" + Data[naa].alt[i] + "<br />";
        }
    } else {
        for (var i = 0; i < Data[naa].alt.length; i++) {
            htmldom += "<input id='" + i + "' type='radio' name='alternativ' value='" + Data[naa].alt[i] + "'/>" + Data[naa].alt[i] + "<br />";
        }
    }
    htmldom += "<br /><input type='button' value='Neste' onclick='neste()'/>"
    table.innerHTML = htmldom;
}

function neste() {

    for (var i = 0; i < Data[naa].alt.length; i++) {
        if (document.getElementById(i).checked && Data[naa].rett.includes(document.getElementById(i).value))
            poeng++;
        else if (document.getElementById(i).checked && !Data[naa].rett.includes(document.getElementById(i).value))
            poeng--;
    }
    if (naa == Data.length - 1) {
        if (poeng == 4)
            alert("Gratulerer, du fikk alle til!");
        else if (poeng > 0 && poeng <= 3)
            alert("Mye bra, men kunne vært bedre; Avisen tilbyr språkkurs viss du er interresert!");
        else
            alert("Dette fikk ikke så bra, men det er håp for alle som vil lære et nytt språk");

    } else {
        naa++;
        valg(valgtspraak);
    }
}

//Forbeholdt Oppgave3.cshtml
var tempString = "";
var tempArray;
var tempVar;

var hotelData = {
    "New-York": {
        "Aurora": {
            "Sommer": 590,
            "Vinter": 690
        },
        "Downtown": {
            "Sommer": 660,
            "Vinter": 750
        },
        "City Hall": {
            "Sommer": 450,
            "Vinter": 530
        },
        "Wilmont": {
            "Sommer": 660,
            "Vinter": 880
        },
        "Chelsea Inn": {
            "Sommer": 450,
            "Vinter": 560
        },
        "Fairfly house": {
            "Sommer": 670,
            "Vinter": 770
        },
        "Baskers street": {
            "Sommer": 500,
            "Vinter": 610
        },
        "Browns Quarters": {
            "Sommer": 450,
            "Vinter": 560
        },
        "The Box House": {
            "Sommer": 430,
            "Vinter": 560
        },
        "Queens Hotel": {
            "Sommer": 510,
            "Vinter": 630
        },
        "Palace": {
            "Sommer": 800,
            "Vinter": 970
        },
        "The new street hotel": {
            "Sommer": 450,
            "Vinter": 670
        },
        "Geralds B&B": {
            "Sommer": 890,
            "Vinter": 990
        },
        "Imperial": {
            "Sommer": 1200,
            "Vinter": 1450
        },
        "Marriot": {
            "Sommer": 1100,
            "Vinter": 1300
        },
        "The London": {
            "Sommer": 780,
            "Vinter": 890
        },
        "Wharfs Hotel": {
            "Sommer": 350,
            "Vinter": 550
        },
        "Locker inn": {
            "Sommer": 560,
            "Vinter": 710
        }
    },
    "St.Petersburg": {
        "Placeholder1": {
            "Sommer": 0,
            "Vinter": 0
        }
    },
    "Amsterdam": {
        "Placeholder2": {
            "Sommer": 0,
            "Vinter": 0
        }
    },
    "Roma": {
        "Placeholder3": {
            "Sommer": 0,
            "Vinter": 0
        }
    }
}

var kvitering = {
    "fra": 0,
    "antDag": 0,
    "by": "",
    "hotel": "",
    "kulturpass": false,
    "enkeltrom": 0,
    "dobbeltrom": 0
}
kvitering.reiseperiode = function () {
    var temp = new Date(this.fra)
    if (temp.getUTCMonth() <= 2 || temp.getUTCMonth() >= 9)
        return "Vinter";
    else
        return "Sommer";
}
kvitering.pris = function () { //Bruker sommerhalvår
    var tempPris = 0;
    if (kvitering.hotel != "") {
        if (kvitering.reiseperiode == "Vinter") {
            tempPris += this.dobbeltrom * this.antDag * hotelData[this.by][this.hotel].Vinter;
            tempPris += this.enkeltrom * this.antDag * (hotelData[this.by][this.hotel].Vinter + 300);
        } else {
            tempPris += this.dobbeltrom * this.antDag * hotelData[this.by][this.hotel].Sommer;
            tempPris += this.enkeltrom * this.antDag * (hotelData[this.by][this.hotel].Sommer + 300);
        }
    }
    if (kvitering.kulturpass)
        tempPris += 700;
    return tempPris + "Kr per. pers";
}

function oppgave3Load() {
    tempString = "";
    tempString += "<option value=''></option>";
    for (var i = 0; i < Object.keys(hotelData).length; i++) {
        tempString += "<option value='" + Object.keys(hotelData)[i] + "'>" + Object.keys(hotelData)[i] + "</option>";
    }
    document.getElementById("by").innerHTML += tempString;
    hotelLoad();
}

function hotelLoad() {
    tempVar = document.getElementById("by").value;
    tempString = "";
    if (document.getElementById("by").value == "") {
        for (var i = 0; i < Object.keys(hotelData).length; i++) {
            for (var j = 0; j < Object.keys(hotelData[Object.keys(hotelData)[i]]).length; j++) {
                tempString += "<div class='trivago' onclick='bychange(" + '"' + Object.keys(hotelData)[i] + '"' + "," + '"' + Object.keys(hotelData[Object.keys(hotelData)[i]])[j] + '"' + ")'><span style='position:absolute;font-weight: bold;'>" + Object.keys(hotelData[Object.keys(hotelData)[i]])[j] + "</span><img src='/Bilder/placeholder.png' alt='Bilde' height='75' width='75' style='float:right;'><br /><span style='color:#2c3e50;font-size:15px;'>Sommerpris: " + hotelData[Object.keys(hotelData)[i]][Object.keys(hotelData[Object.keys(hotelData)[i]])[j]].Sommer + "<br />Vinterpris: " + hotelData[Object.keys(hotelData)[i]][Object.keys(hotelData[Object.keys(hotelData)[i]])[j]].Vinter + "</span></div>";
            }
        }
    } else {
        for (var i = 0; i < Object.keys(hotelData[tempVar]).length; i++) {
            tempString += "<div class='trivago' onclick='bychange(" + '"' + tempVar + '"' + "," + '"' + Object.keys(hotelData[tempVar])[i] + '"' + ")'><span style='position:absolute;font-weight: bold;'>" + Object.keys(hotelData[tempVar])[i] + "</span><img src='/Bilder/placeholder.png' alt='Bilde' height='75' width='75' style='float:right;'><br /><span style='color:#2c3e50;font-size:15px;'>Sommerpris: " + hotelData[tempVar][Object.keys(hotelData[tempVar])[i]].Sommer + "<br />Vinterpris: " + hotelData[tempVar][Object.keys(hotelData[tempVar])[i]].Vinter + "</span></div>";
        }
    }
    document.getElementById("hoteller").innerHTML = tempString;
    update();
}

function bychange(byNavn, hotelNavn) {
    kvitering.by = byNavn;
    kvitering.hotel = hotelNavn;
    update();
}

function endre(navn, verdi) {
    switch (navn) {
        case "datoFra":
            kvitering.fra = verdi;
            break;
        case "antDag":
            kvitering.antDag = verdi;
            break;
        case "romD":
            kvitering.dobbeltrom = verdi;
            break;
        case "romE":
            kvitering.enkeltrom = verdi;
            break;
        case "kultpass":
            kvitering.kulturpass = !kvitering.kulturpass;
            break;
    }
    update();
}

function update() {
    if (kvitering.by != "")
        document.getElementById("resBy").innerHTML = kvitering.by;
    if (kvitering.hotel != "")
        document.getElementById("resHotel").innerHTML = kvitering.hotel;
    document.getElementById("resDager").innerHTML = kvitering.antDag;
    if (kvitering.fra != 0)
        document.getElementById("resReiseperiode").innerHTML = kvitering.reiseperiode();
    document.getElementById("resDRom").innerHTML = kvitering.dobbeltrom;
    document.getElementById("resERom").innerHTML = kvitering.enkeltrom;
    if (kvitering.kulturpass)
        document.getElementById("resPass").innerHTML = "Ja(700kr)";
    else
        document.getElementById("resPass").innerHTML = "Nei";
    document.getElementById("resSum").innerHTML = kvitering.pris();
}
