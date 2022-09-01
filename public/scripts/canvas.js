let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
let body = document.querySelector('#body');
let menuButtons = document.querySelector('#menuButtons')


let raf;
let running = false;

const ball = {
  x: 0,
  y: 0,
  vx: 5,
  vy: 1,
  radius: 25,
  color: 'black',
  draw() {
    ctx.beginPath();
    // ctx.fillRect(this.x, this.y, 50, 50)
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}


let bounding = canvas.getBoundingClientRect();
let penButton = true;
let lineButton = false;
let squareButton = false;
let circleButton = false;
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
  canvas.removeEventListener
  console.log(e.target)
  if(e.target.id == "drawButton" || e.target.parentElement.id == "drawButton"){
    ball.color = 'black';
    penButton = true
    lineButton = false
    squareButton = false
    circleButton = false
    eyeButton = false

  }
  if(e.target.id == "lineButton" || e.target.parentElement.id == "lineButton"){
    penButton = false
    lineButton = true
    squareButton = false
    circleButton = false
    eyeButton = false

  }
  if(e.target.id == "squareButton" || e.target.parentElement.id == "squareButton"){
    penButton = false
    lineButton = false
    squareButton = true
    circleButton = false
    eyeButton = false

  }
  if(e.target.id == "circleButton" || e.target.parentElement.id == "circleButton"){
    penButton = false
    lineButton = false
    squareButton = false
    circleButton = true
    eyeButton = false

  }
  if(e.target.id == "eraserButton" || e.target.parentElement.id == "eraserButton"){
    ball.color = 'white';
    penButton = true
    lineButton = false
    squareButton = false
    circleButton = false
    eyeButton = false

  }
  if(e.target.id == "clearButton" || e.target.parentElement.id == "clearButton"){
    ctx.clearRect(0, 0, 1000, 1000);
    penButton = false
    lineButton = false
    squareButton = false
    circleButton = false
    eyeButton = false

  }
  if(e.target.id == "eyeButton" || e.target.parentElement.id == "eyeButton"){
    penButton = false
    lineButton = false
    squareButton = false
    circleButton = false
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

canvas.addEventListener('click',(e)=>{
  if (lineButton) {
    if(count == 0){
      count = 1
      console.log('running')
      pointOne[0] = e.clientX - bounding.left
      pointOne[1] = e.clientY - bounding.top
      // ctx.fillRect(e.clientX - bounding.left, e.clientY - bounding.top, 5, 5)
    }
    else if (count == 1){
      ctx.beginPath();
      ctx.moveTo(pointOne[0], pointOne[1]);
      ctx.lineTo(e.clientX - bounding.left, e.clientY - bounding.top);
      ctx.stroke();
      count = 0
    }
  }
  if (squareButton) {
    if(count == 0){
      count = 1
      console.log('running')
      pointOne[0] = e.clientX - bounding.left
      pointOne[1] = e.clientY - bounding.top
      // ctx.fillRect(e.clientX - bounding.left, e.clientY - bounding.top, 5, 5)
    }
    else if (count == 1){
      console.log('square')
      ctx.beginPath();
      ctx.moveTo(pointOne[0], pointOne[1]);
      ctx.lineTo(pointOne[0], e.clientY - bounding.top)
      ctx.lineTo(e.clientX - bounding.left, e.clientY - bounding.top);
      ctx.lineTo(e.clientX - bounding.left, pointOne[1])
      ctx.lineTo(pointOne[0], pointOne[1]);
      ctx.stroke();
      count = 0
    }
  }
  if (circleButton) {
    if(count == 0){
      count = 1
      console.log('running')
      pointOne[0] = e.clientX - bounding.left
      pointOne[1] = e.clientY - bounding.top
      // ctx.fillRect(e.clientX - bounding.left, e.clientY - bounding.top, 5, 5)
    }
    else if (count == 1){
      let xMid = ((Math.abs(pointOne[0]-(e.clientX - bounding.left)))/2)
      let yMid = ((Math.abs(pointOne[1]-(e.clientY - bounding.top)))/2)
      if(pointOne[0]<(e.clientX - bounding.left)){
        xMid2 = xMid
        xMid = pointOne[0]+xMid
      }
      else{
        xMid2 = xMid
        xMid = (e.clientX - bounding.left)+xMid
      }
      if(pointOne[1]<(e.clientY - bounding.top)){
        yMid = pointOne[1]+yMid
      }
      else{
        yMid = (e.clientY - bounding.top)+yMid
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
      count = 0
    }
  }
  if(eyeButton){
    pick(e, selectedColor)
  }
})

canvas.addEventListener('mousemove', (e) => {
    // console.log(widthOffset)
  
  canvas.addEventListener('mousedown', () => {
      bounding = canvas.getBoundingClientRect();
      running = true

  })
  body.addEventListener('mouseup', () => {
      running = false
  })
  if (running) {
    if(penButton){
      ball.x = e.clientX - bounding.left;
      ball.y = e.clientY - bounding.top;
      ball.draw();
    }
  
  }
});


function save() {
  let dataURL = canvas.toDataURL()
  console.log(dataURL)

    const newImg = document.createElement('img');

    newImg.src = `dataURL`;
    document.body.appendChild(newImg);
  // })
}