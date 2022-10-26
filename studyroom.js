img="";
statuss = "";
array=[]; 
function preload(){
    img= loadImage("studyroom.jpg");
}
function setup(){
    canvas = createCanvas(640,320);
    canvas.position(350,200);
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting objects..."
}
function draw(){
    image(img,0,0,640,320);
    if (statuss != ""){
        console.log("entered");
        for (i=0;i<array.length;i++){
            fill("#e2afff");
            showtext=Math.floor(array[i].confidence*100);
            text(array[i].label+" - "+showtext+"%",array[i].x-250,array[i].y-150)
            noFill();
            stroke("#8900f2");
            rect(array[i].x-250,array[i].y-150,array[i].height,array[i].width);
        }
        document.getElementById("howmany").innerHTML="2 objects are there in the image out of which "+ array.length +" are detected"
        document.getElementById("status").innerHTML="Objects detected!"
    }
    
}
function modelLoaded(){
    console.log("Model Loaded!")
    statuss="true";
    objectdetector.detect(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        array=results;
    }
}