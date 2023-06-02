Status = "";
ac_image = "";
objects = [];

function preload(){
    ac_image = loadImage("ac.jpg");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(ac_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(ac_image,0,0,640,420);
    if(Status != ""){
        for(i = 0 ; i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Detected Objects"

            fill("FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y );
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y  , objects[i].width, objects[i].height);
        }
    }
}