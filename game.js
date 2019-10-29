var dir = Math.round(Math.random());
var orientation = 0;
var deg = 0;

function RotateContainer () {
    var mc = document.getElementById("main_container");

    mc.style.transform = "rotate("+deg+"deg)";
    
    if(orientation - deg >= 90 || orientation - deg <= -90) { 
        orientation = deg;
        dir = Math.round(Math.random());
        console.log("orientation: " + orientation);
        console.log("deg: " + deg);
        return; 
    }
    
    loop = setTimeout('RotateContainer()', 5);

    if(dir) {
        deg++;
    } else {
        deg--;
    }
}
