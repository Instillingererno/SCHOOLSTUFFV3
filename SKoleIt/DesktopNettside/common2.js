function Save(Name, TabName) {
    if(typeof (Storage) !== "undefined") {
        localStorage.setItem(Name, JSON.stringify(TabName));
    }
    else {
        alert("Could not save tab to file")
    }
}
function GetFile(Name) {
    try {
        var tmpTab = [];
        tmpTab = JSON.parse(localStorage.getItem(Name));
        return tmpTab;
    }
    catch(e) {
        tmpTab = [];
        return tmpTab;
    }
}
function test() {
    console.log("SUCCESS");
}
var tab = function(name, link) {
    this.name = name;
    this.link = link;
}