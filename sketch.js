var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload(){
  dogImg=loadImage("Dog.png");
  dogImg1=loadImage("happy dog.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
 
}


function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  textSize(25);
  fill("white")
  text("Remaining Food: "+foodS,150,200);
  text("Press UP_ARROW Key to Feed ",110,30);
}

// Read from Database
function readStock(data){
  foodS=data.val();
}

// write to Database
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}