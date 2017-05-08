//Settings
var tileSize = 5;

//Global variables
var map = [];
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var canvas, ctx, calcTime, renderTime;

//Camera
var camera = {
    "x" : 2.5,
    "y" : 5,
    "z" : 1,
    "ang" : 0
}
camera.reset = function() {
    this.x = 0;
    this.y = 0;
    this.z = 1;
    this.ang = 0;
}
//Calculation

//Render
function render() {
    
}

//Div. functions
function onloadBody() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    ctx.canvas.height = windowHeight;
    ctx.canvas.width = windowWidth;
    fileLoad("maps/default.txt");
}

function fileLoad(filNavn) {
    //"0" For floor tile, "1" For 'insert item here', "2" For 'insert item here'
    var x;
    var y;
    var temp_map = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            y = xhttp.responseText.split("\n");
            console.log(y);
            for (var i = 0; i < y.length; i++) {
                x = Array.from(y[i]);
                temp_map.push(x);
            }
        }
    };
    xhttp.open("GET", filNavn, false);
    xhttp.send();
    console.log(temp_map);
}