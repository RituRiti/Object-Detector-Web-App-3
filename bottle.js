Status = "";
bottle_image = "";
objects = [];

function preload(){
    bottle_image = loadImage("bottle.jpg");
}

function setup(){
    canvas = createCanvas(400,300);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bottle_image,gotResults);
}



function draw(){
    image(bottle_image,0,0,400,300);
    if(Status != ""){
        for(i = 0 ; i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Detected Objects"

            fill("#001e51");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x ,objects[i].y );
            noFill();
            stroke("#001e51");
            rect(objects[i].x -14 , objects[i].y - 14 , objects[i].width, objects[i].height );
        }
    }
}