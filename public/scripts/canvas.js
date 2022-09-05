let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
let body = document.querySelector('#body');
let menuButtons = document.querySelector('#menuButtons')
let stroke = document.querySelector("#stroke")

if(document.querySelector("#picture")){
  let picture = document.querySelector("#picture")
  let title = document.querySelector("#title").innerHTML
  let id = document.querySelector("#id").innerHTML
  let titleForm = document.querySelector('#titleForm')
}




let running = false;



function init() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 1010, 1000);
  ctx.fillStyle = "black"
  if(document.querySelector("#picture")){
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = picture.src;
  }
  else{
    id = false
  }
}




function strokeSize(){
  if(stroke.value){
    console.log(stroke.value)
    return stroke.value
  }
  else{
    console.log('10')
    return 10
  }
}



//--------------------------------------------------------------------COLOR SELECT-----------------------------------------------------------------



var hue = 0;
var saturation = 0;
var lightness = 0;
var color;

//Get hue canvas
var hueCanvas = document.getElementById('hue-picker')
var ctxHue = hueCanvas.getContext('2d');
hueCanvas.width = 360;
hueCanvas.height = 20;

//Get hue canvas
var colorCanvas = document.getElementById('color-picker')
var ctxColor = colorCanvas.getContext('2d');
colorCanvas.width = 100;
colorCanvas.height = 100;

drawHue(ctxHue);
drawColor(ctxColor, hue);

function drawHue(ctx) {
  for(let hueCounter = 0; hueCounter <= 360; hueCounter++) {
    ctx.beginPath();
    ctx.rect(hueCounter, 0, 1, 20);
    ctx.fillStyle = 'hsl(' + hueCounter + ',100%,50%)';
    ctx.fill();
  }
}

function drawColor(ctx, hue) {
  for(let saturationCounter = 0; saturationCounter <= 100; saturationCounter++) {
    for(let lightnessCounter = 0; lightnessCounter <= 100; lightnessCounter++) {
      ctx.beginPath();
      ctx.rect(saturationCounter, lightnessCounter, 1, 1);
      let lightnessVal = Math.abs(lightnessCounter - 100);
      ctx.fillStyle = 'hsl(' + hue + ',' + saturationCounter + '%,' + lightnessVal + '%)';
      ctx.fill();
    }
  }
}

hueCanvas.addEventListener('click', (e) => {
  let hueCanvasPos = hueCanvas.getBoundingClientRect().x;
  let hueCanvasDocWidth = hueCanvas.getBoundingClientRect().width;
  let hueCanvasWidth = hueCanvas.width;
  let hueCanvasRatio = hueCanvasWidth / hueCanvasDocWidth;
  hue = ((e.x) - hueCanvasPos) * hueCanvasRatio;
  hue = Math.round(hue);
  drawColor(ctxColor, hue);
});

colorCanvas.addEventListener('click', (e) => {
  let colorCanvasPosX = colorCanvas.getBoundingClientRect().x;
  let colorCanvasPosY = colorCanvas.getBoundingClientRect().y;
  let colorCanvasDocWidth = colorCanvas.getBoundingClientRect().width;
  let colorCanvasWidth = colorCanvas.width;
  let colorCanvasRatio = colorCanvasWidth / colorCanvasDocWidth;
  saturation = ((e.x) - colorCanvasPosX) * colorCanvasRatio;
  lightness = ((e.y) - colorCanvasPosY) * colorCanvasRatio;
  saturation = Math.round(saturation);
  lightness = Math.round(lightness);
  lightness = Math.abs(lightness - 100);
  color = 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
  console.log(color);
  setColor();
})

function setColor() {
  ctx.strokeStyle = color
}



//-------------------------------------------------------------MENU BAR BOTTOM-----------------------------------------------------------------------------------



const ball = {
  x: 0,
  y: 0,
  vx: 5,
  vy: 1,
  radius: 10,
  color: 'black',
  draw() {
    ctx.beginPath();
    // ctx.fillRect(this.x, this.y, 50, 50)
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let bounding = canvas.getBoundingClientRect();
let penButton = true;
let lineButton = false;
let squareButton = false;
let circleButton = false;
let eraserButton = false;
let eyeButton = false;
let count = 0
let pointOne = []
let pointTwo = []

// function getMousePos(canvas, e) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: e.clientX - rect.left,
//     y: e.clientY - rect.top
//   };
// }

menuButtons.addEventListener('click',(e)=>{
  
  start = false
  
  console.log(e.target)
  if(e.target.id == "drawButton" || e.target.parentElement.id == "drawButton"){
    ball.color = 'black';
    penButton = true
    lineButton = false
    squareButton = false
    circleButton = false
    eraserButton = false
    eyeButton = false

  }
  if(e.target.id == "lineButton" || e.target.parentElement.id == "lineButton"){
    penButton = false
    lineButton = true
    squareButton = false
    circleButton = false
    eraserButton = false
    eyeButton = false

  }
  if(e.target.id == "squareButton" || e.target.parentElement.id == "squareButton"){
    penButton = false
    lineButton = false
    squareButton = true
    circleButton = false
    eraserButton = false
    eyeButton = false

  }
  if(e.target.id == "circleButton" || e.target.parentElement.id == "circleButton"){
    penButton = false
    lineButton = false
    squareButton = false
    circleButton = true
    eraserButton = false
    eyeButton = false

  }
  if(e.target.id == "eraserButton" || e.target.parentElement.id == "eraserButton"){
    penButton = true
    lineButton = false
    squareButton = false
    circleButton = false
    eraserButton = true
    eyeButton = false

  }
  if(e.target.id == "clearButton" || e.target.parentElement.id == "clearButton"){
    ctx.clearRect(0, 0, 1010, 1000);
    penButton = false
    lineButton = false
    squareButton = false
    circleButton = false
    eraserButton = false
    eyeButton = false

  }
  if(e.target.id == "eyeButton" || e.target.parentElement.id == "eyeButton"){
    penButton = false
    lineButton = false
    squareButton = false
    circleButton = false
    eraserButton = false
    eyeButton = true

  }
})

function pick(e, destination) {
  const bounding = canvas.getBoundingClientRect();
  const x = e.clientX - bounding.left;
  const y = e.clientY - bounding.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  destination.style.background = rgba;
  destination.textContent = rgba;

  return rgba;
}
  // console.log(widthOffset)

canvas.addEventListener('mousedown', (e2) => {
  console.log('mouse down')
    bounding = canvas.getBoundingClientRect();
    running = true
    if (lineButton) {
        console.log('running')
        pointOne[0] = e2.clientX - bounding.left
        pointOne[1] = e2.clientY - bounding.top
        // ctx.fillRect(e.clientX - bounding.left, e.clientY - bounding.top, 5, 5)
      }
    
    if (squareButton) {
        console.log('running')
        pointOne[0] = e2.clientX - bounding.left
        pointOne[1] = e2.clientY - bounding.top
        // ctx.fillRect(e.clientX - bounding.left, e.clientY - bounding.top, 5, 5) 

    }
    if (circleButton) {
        console.log('running')
        pointOne[0] = e2.clientX - bounding.left
        pointOne[1] = e2.clientY - bounding.top
        // ctx.fillRect(e.clientX - bounding.left, e.clientY - bounding.top, 5, 5)

      
      
    }
    if(eyeButton){
      pick(e2, selectedColor)
    }
  })

body.addEventListener('mouseup', () => {
  console.log('mouse up')
    running = false
    canvas.addEventListener('mouseup', (e2) => {
    if (lineButton) {
        ctx.lineWidth = strokeSize()
        ctx.beginPath();
        ctx.moveTo(pointOne[0], pointOne[1]);
        ctx.lineTo(e2.clientX - bounding.left, e2.clientY - bounding.top);
        ctx.stroke();

      
    }
    if (squareButton) {

        console.log('square')
        ctx.lineWidth = strokeSize()
        ctx.beginPath();
        ctx.moveTo(pointOne[0], pointOne[1]);
        ctx.lineTo(pointOne[0], e2.clientY - bounding.top)
        ctx.lineTo(e2.clientX - bounding.left, e2.clientY - bounding.top);
        ctx.lineTo(e2.clientX - bounding.left, pointOne[1])
        ctx.lineTo(pointOne[0], pointOne[1]);
        ctx.stroke();
      
    }
    if (circleButton) {

        ctx.lineWidth = strokeSize()
        let xMid = ((Math.abs(pointOne[0]-(e2.clientX - bounding.left)))/2)
        let yMid = ((Math.abs(pointOne[1]-(e2.clientY - bounding.top)))/2)
        if(pointOne[0]<(e2.clientX - bounding.left)){
          xMid2 = xMid
          xMid = pointOne[0]+xMid
        }
        else{
          xMid2 = xMid
          xMid = (e2.clientX - bounding.left)+xMid
        }
        if(pointOne[1]<(e2.clientY - bounding.top)){
          yMid = pointOne[1]+yMid
        }
        else{
          yMid = (e2.clientY - bounding.top)+yMid
        }
        console.log('circle')
        // console.log(count)
        console.log(xMid)
        // console.log(yMid)
        ctx.beginPath();
        ctx.arc(xMid,yMid,xMid2,0,Math.PI * 2, true)
        // ctx.moveTo(pointOne[0], pointOne[1]);
        // ctx.arcTo(pointOne[0], pointOne[1],e.clientX - bounding.left, e.clientY - bounding.top, 200)
        // ctx.arcTo(e.clientX - bounding.left, e.clientY - bounding.top,pointOne[0], pointOne[1], 200)
        // ctx.quadraticCurveTo(pointOne[0], pointOne[1], xMid, yMid)
        // ctx.quadraticCurveTo(e.clientX - bounding.left, e.clientY - bounding.top, xMid, yMid)
        ctx.stroke();

    }
    if(eraserButton){
      ball.color = colorHold
    }
})
})
canvas.addEventListener('mousemove', (e) => {
  if (running) {
    if(penButton){
      if(eraserButton){
        console.log(color)
        colorHold = color
        ball.color = 'white';
      }
      else{
        ball.color = color
      }
      ball.x = e.clientX - bounding.left;
      ball.y = e.clientY - bounding.top;
      ball.radius = strokeSize()
      ball.draw();
    }
  
  }

});


function save() {

  let title = document.querySelector('#title').value
  const httpRequest = new XMLHttpRequest();
  let dataURL = canvas.toDataURL()

  console.log(dataURL)
  console.log(title);
  
  httpRequest.open("POST", "/draw", true);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send(`title=${title}&body=${dataURL}`);
  // console.log(dataURL)


}


init()
