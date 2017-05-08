"use stict";

var frokost = {
    "Kcal": 0,
    "Protein": 0,
    "Fett": 0,
    "Karbohydrater": 0
};
frokost.reset = function () {
    frokost.Kcal = 0;
    frokost.Protein = 0;
    frokost.Fett = 0;
    frokost.Karbohydrater = 0;
};

var data = [ //Hele nettsiden er avhengig av dataen i denne tabellen, det gjør nettsiden lett å utvide senere. Senere kunne funksjonaliteten at dataen ble lest fra en tekstfil bli lagt til, men det virker ikke særlig nødvendig siden dataen ikke trengs å oppdateres veldig ofte
    ["Matvare", "Kcal", "Protein( i gram)", "Fett (i gram)", "Karbohydrater (i gram)", "Antall spist"],
    ["Lettmelk (1 glass på 2dl)", 92, 6.6, 3, 9.6],
    ["1 egg", 80, 6.9, 5.5, 0.7],
    ["Grovbrød (1 skrive = 40g)", 103, 3.5, 1, 19.6],
    ["Smør (til 1 brødskive)", 36, 0.025, 4.1, 0.025],
    ["Gulost (1 skive)", 53, 4, 4.2, 0]
];

function btnUtfor_onclick() {
    try {
        frokost.reset();
        for (var i = 1; i < data.length; i++) {
            var inp = document.getElementById("inp" + i).value;
            frokost.Kcal += data[i][1] * inp;
            frokost.Protein += data[i][2] * inp;
            frokost.Fett += data[i][3] * inp;
            frokost.Karbohydrater += data[i][4] * inp;
        }
        document.getElementById("Utskrift").innerHTML = "Kcal: " + frokost.Kcal.toFixed(1) + ";<br />Protein: " + frokost.Protein.toFixed(1) + ";<br />Fett: " + frokost.Fett.toFixed(1) + ";<br />Karbohydrater: " + frokost.Karbohydrater.toFixed(1) + ";";
    } catch (e) {
        alert(e);
    }
}

function btnReset_onclick() {
    for (var i = 1; i < data.length; i++) {
        document.getElementById("inp" + i).value = null;
    }
    document.getElementById("Utskrift").innerHTML = "";
    frokost.reset();
}

function onbodyLoad() {
    for (var i = 0; i < data.length; i++) {
        var rad = "";
        for (var j = 0; j < data[i].length; j++) {
            rad += "<td>" + data[i][j] + "</td>";
        }
        if (i != 0) //Siden (i = 0) vil tilsvare dataen med overskriftene
            rad += "<td><input id='inp" + i + "' type='number'></td>";
        document.getElementById("tabell").innerHTML += "<tr>" + rad + "</tr>";
    }
    document.getElementById("tabell").innerHTML += "<tr><td></td><td></td><td></td><td></td><td></td><td><input id='btnUtfor' type='button' value='Regn ut' onclick='btnUtfor_onclick()'><input id='btnReset' type='button' value='Reset' onclick='btnReset_onclick()'></td></tr>"
}
