const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const body = document.querySelector('#body');

let raf;
let running = false;

const ball = {
  x: 0,
  y: 0,
  vx: 5,
  vy: 1,
  radius: 25,
  color: 'blue',
  draw() {
    // ctx.beginPath();
    ctx.fillRect(this.x, this.y, 50, 50)
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    // ctx.closePath();
    ctx.fillStyle = this.color;
    // ctx.fill();
  }
};

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

// function draw() {
//   ball.draw();
//   ball.x += ball.vx;
//   ball.y += ball.vy;

//   if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
//     ball.vy = -ball.vy;
//   }
//   if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
//     ball.vx = -ball.vx;
//   }

// }
// let widthOffset = 0
let bounding = canvas.getBoundingClientRect();

body.addEventListener('mousemove', (e) => {
    // console.log(widthOffset)
    
    canvas.addEventListener('mousedown', () => {
        bounding = canvas.getBoundingClientRect();
        running = true
    })
    canvas.addEventListener('mouseup', () => {
        running = false
    })
  if (running) {
    // widthOffset = (body.clientWidth%1000)
    // console.log(e)

    ball.x = e.clientX - bounding.left;
    ball.y = e.clientY - bounding.top;
    ball.draw();
  }
});


function save() {
  canvas.toBlob((blob)=>{
    const newImg = document.createElement('img');
    const url = URL.createObjectURL(blob);
    console.log(blob)
   console.log(url)

    // newImg.onload = () => {

    //   URL.revokeObjectURL(url);
    // };
  
    newImg.src = url;
    document.body.appendChild(newImg);
  })
}