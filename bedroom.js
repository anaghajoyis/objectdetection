img="";
statuss = " ";
array=[]; 
function preload(){
    img= loadImage("bedroom.jpg");
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
            fill("#ffba08");
            console.log("coloured");
            showtext=Math.floor(array[i].confidence*100);
            text(array[i].label+" - "+showtext+"%",array[i].x-500,array[i].y-40)
            console.log("texted");
            noFill();
            stroke("#d00000");
            rect(array[i].x-500,array[i].y,array[i].height,array[i].width);
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
        console.log(array);
    }
}