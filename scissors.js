Status = "";
scissors_image = "";
objects = [];

function preload(){
   scissors_image = loadImage("scissors.jpg");
}

function setup(){
    canvas = createCanvas(400,300);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(scissors_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}


function draw(){
    image(scissors_image,0,0,400,300);
    if(Status != ""){
        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Detected Objects"

            fill("#FFFFFF");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x ,objects[i].y);
            noFill();
            stroke("#FFFFFF");
            rect(objects[i].x +70, objects[i].y + 40 , objects[i].width + 100, objects[i].height +200);
        }
    }
}