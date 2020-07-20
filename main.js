img = "";
status = "";
objects = [];
function preload() {
    img = loadImage('dog_cat.jpg');
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}
function draw() {
    image(video, 0, 0, 380, 380);
        if(status != "") {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);
           for(s = 0; s <objects.length; s++) {
               document.getElementById("status").innerHTML = "Status : Objects Detected";
               document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are : "+objects.length;
               fill(r, g, b);
               percent = floor(objects[s].confidence * 100);
               text(objects[s].label +" "+ percent + "%", objects[s].x+15, objects[s].y+15);
               noFill();
               stroke(r, g, b);
               rect(objects[s].x, objects[s].y, objects[s].width, objects[s].height);
        }
    }
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}