var mousePos = {
    x: 0,
    y: 0
}

onmousemove = function (e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
};
//Saves array to .txt file... use: $Save(filename, arrayname)
function $Save(Name, TabName) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(Name, JSON.stringify(TabName));
    } else {
        alert("Could not save tab to file")
    }
}
//Retrieves items stored in a txt file... use: var array = $GetFile(filename)
function $GetFile(Name) {
    try {
        var tmpTab = [];
        tmpTab = JSON.parse(localStorage.getItem(Name));
        return tmpTab;
    } catch (e) {
        tmpTab = [];
        return tmpTab;
    }
}


//Create new vector... use: var something = new Vector(x,y)
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    //Calculate vector magnitude... use: vectorobject.Mag() returns magnitude
    Mag() {
        return Math.sqrt(this.x ^ 2 + this.y ^ 2);
    }
}
