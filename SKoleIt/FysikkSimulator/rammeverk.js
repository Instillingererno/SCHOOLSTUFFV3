//RAMMEVERK LAGET TIDLIGERE
//Settings, these can be changed
var framerate = 60; //Default = 30; Max-250 ;Frames per second, how many times screen updating happens per second
var timeCalculationTimer = 1000; //Default = 1000; How often timer is updated, makes no difference under 1000, delays updating over 1000!
//Global variables; By function
    //Update
var updateInterval;
var frameCount = 0;
    //Calculations (plural)
    //FPS
var FPS = 0;
    //Timer
var timingInterval;
var timeSpent = 0;
var timeAtStart = Date.now(); //Time when timer() is called!
var timeAtPresent = 0; //Time when calculateSpentTime() is called!
var timingInterval = 0;
    //Mouse posistion: 
//x-axis
var xpos;
//y-axis
var ypos;
    //Toggle SideNav
var isOpen = true;
    //Object settings
var spanCollides;
var spanMass;
var spanHeight;
var spanWidth;
var spanZIndex;
var selType;
var spanFriction;
    //Drag object
var dragInterval;
var dragArray = [];
var selected = null;
var mousex;
var mousey;
               
onmousemove = function(e){xpos = e.clientX; ypos = e.clientY-30}/*,mousemove()*/;
//onmousedown = mousedownpress();
//onmouseup = mouseup();
            
function pageload() {
    timingInterval = setInterval(timer, timeCalculationTimer); //Calls timer function to start "stopclock"
    updateInterval = setInterval(update, Math.round(1000 / framerate)); //Starts the update function based on framerate set in settings
    CalculateInterval = setInterval(Calculate, Math.round(1000 / framerate)); //Start the calculate function in fysikk.js determines the thing things
    /*document.getElementById("header").style.width = window.innerWidth;
    document.getElementById("meny").style.height = window.innerHeight;
    document.getElementById("canvasDiv").style.height = window.innerHeight - 30;
    document.getElementById("canvasDiv").style.width = window.innerWidth - 55;
    document.getElementById("canvas").style.height = window.innerHeight - 30;
    document.getElementById("canvas").style.width = window.innerWidth - 55;*/
}

function timer() {
    //Timer
    timeAtPresent = Date.now(); //Updates timeAtPresent variable to current time
    timeSpent = Math.round((timeAtPresent - timeAtStart) / 1000); //Calculates the spent time in seconds          
    //FPS
    FPS = (Math.floor((frameCount / timeSpent)*10)/10).toFixed(1);  
        document.getElementById("header").style.width = window.innerWidth;
    document.getElementById("meny").style.height = window.innerHeight;
    document.getElementById("canvasDiv").style.height = window.innerHeight - 30;
    document.getElementById("canvasDiv").style.width = window.innerWidth - 55;
    document.getElementById("canvas").style.height = window.innerHeight - 30;
    document.getElementById("canvas").style.width = window.innerWidth - 55;
}
function update() {
    document.getElementById("spanPos").innerHTML = xpos + " , " + ypos;
    document.getElementById("spanTime").innerHTML = timeSpent;
    document.getElementById("spanFrameCount").innerHTML = frameCount;
    document.getElementById("spanFPS").innerHTML = FPS;
    document.getElementById("spanCollides").innerHTML = selected;
    document.getElementById("spanType").innerHTML = dragArray;
}
function toggleSidenav() {
    if(isOpen == true) {
        document.getElementById("meny").style.width = "50px";
        document.getElementById("MenyToggle").innerHTML = "<<";
        isOpen = false;
    }
    else {
        document.getElementById("meny").style.width = "300px";
        document.getElementById("MenyToggle").innerHTML = ">>";
        isOpen = true;
    }
}
function toggle(asdf) {
    switch(asdf) {
        case "collides":
            if(document.getElementById("inpCollides").innerHTML == "false") {
                document.getElementById("inpCollides").innerHTML = "true";
            }
            else {
                document.getElementById("inpCollides").innerHTML = "false";
            }
            break;
    }
}
function btnAdd() {
    Collides = document.getElementById("inpCollides").innerHTML;
    Mass = document.getElementById("inpMass").value;
    Height = parseInt(document.getElementById("inpHeight").value);
    Width = parseInt(document.getElementById("inpWidth").value);
    ZIndex = document.getElementById("inpZIndex").value;
    Type = document.getElementById("inpType").value;
    Friction = document.getElementById("inpFriction").value;
    objects.push(new newObject(Collides, Mass, Height, Width, ZIndex, Type, Friction));
}
/*
function mousedownpress() {
    //Make a loop that places all the objects in a seperate array only saving xpos, ypos, width and height
    //and check if the mouse pointer is inbetween any of them, which will make them selecred
    //Should sort objects array on zindex first, but that'll be added late
    mousex = xpos;
    mousey = ypos;
    if(objects.length > 0) {
        for(var i = 0; i < objects.length; i++) {
        dragArray[i][0] = objects[i].Xposition; 
        dragArray[i][1] = objects[i].Yposition;
        dragArray[i][2] = objects[i].Width;
        dragArray[i][3] = objects[i].Height;
        }
        for(var i = 0; i < dragArray.length; i++) {
            if(xpos > dragArray[i][0] && ypos > dragArray[i][1] && xpos < dragArray[i][2] && ypos < dragArray[i][3]) {
                objects[i].selected = true;
                selected = i;
                break;
            }   
        }
    }
    
}
function mousemove() {
    if(selected != null) {
        objects[selected].Xposition += (mousex - xpos);
        objects[selected].Yposition += (mousey - ypos);
    }
}
function mouseup() {
    selected = null;
    for(var i = 0; i < objects.length; i++) {
        if(objects[i].selected == true)
            objects[i].selected = false;
    }
}
*/
canvas.onclick = function(event) {
    if(event.region) {
        alert("You clicked " + event.region);
    }
}