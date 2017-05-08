//ALT DET NYE JAVASCRIPTEN TIL DENNE SIDEN
//Make a physics engine and object creation
//Settings
var gravity = 1;
//Global variables
var objects = [];
var CalculateInterval;


var newObject = function(Collides, Mass, Height, Width, ZIndex, Type, Friction) {
    //WHAT DO I WANT TO SIMULATE
    this.Collides = Collides;
    this.Mass = Mass;
    this.Xposition = 0;
    this.Yposition = 0;
    this.Height = Height;
    this.Width = Width;
    this.SpeedX = Math.random()*14;
    this.SpeedY = 0;
    this.AccX = 0;
    this.AccY = 0.5;
    this.ZIndex = ZIndex;
    this.CollisionX = false;
    this.CollisionY = false;
    this.Type = Type;
    this.frictionNr = Friction;
    this.rotation = 0;
    this.selected = false;
    //Seperate collisions in y and x axis? or make detect funtion
}

//Objects = [Collides , Mass , Xpos , Ypos , Height , Width , ]
function Calculate() {
    //Screen reseting and shiit
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.canvas.width  = window.innerWidth - 55;
    ctx.canvas.height = window.innerHeight - 30;
    
    //Updating
    for(var i = 0; i < objects.length; i++) {
        ctx.beginPath();
        ctx.strokeRect(objects[i].Xposition, objects[i].Yposition, objects[i].Width, objects[i].Height);
        ctx.fill();
    }
    
    //Calculation
    for(var i = 0; i < objects.length; i++) {
        objects[i].Yposition += objects[i].SpeedY;
        objects[i].SpeedY += objects[i].AccY;
        objects[i].Xposition += objects[i].SpeedX;
    }
    frameCount ++;
}