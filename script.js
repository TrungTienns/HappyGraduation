/* MUSIC */

const music = document.getElementById("bgMusic");
const switchBtn = document.getElementById("musicSwitch");

switchBtn.addEventListener("change", () => {

if (switchBtn.checked){
music.play();
}else{
music.pause();
}

});


/* FIREWORKS */

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();


class Particle{

constructor(x,y,color){

this.x = x;
this.y = y;
this.color = color;

this.velocity = {
x:(Math.random()-0.5)*8,
y:(Math.random()-0.5)*8
};

this.alpha = 1;
this.friction = 0.95;

}

draw(){

ctx.save();
ctx.globalAlpha = this.alpha;

ctx.beginPath();
ctx.arc(this.x,this.y,2,0,Math.PI*2);
ctx.fillStyle = this.color;
ctx.fill();

ctx.restore();

}

update(){

this.velocity.x *= this.friction;
this.velocity.y *= this.friction;

this.x += this.velocity.x;
this.y += this.velocity.y;

this.alpha -= 0.012;

}

}


let particles = [];


function createFirework(x,y){

const colors = ['#ff4081','#00e5ff','#ffffff','#ffeb3b'];

const color = colors[Math.floor(Math.random()*colors.length)];

for(let i=0;i<30;i++){

particles.push(new Particle(x,y,color));

}

}


function animate(){

/* KHÔNG làm đen background nữa */

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach((p,i)=>{

if(p.alpha > 0){
p.update();
p.draw();
}else{
particles.splice(i,1);
}

});

requestAnimationFrame(animate);

}


setInterval(()=>{

createFirework(
Math.random()*canvas.width,
Math.random()*canvas.height*0.7
);

},1200);


animate();



/* GALLERY MODAL */

const images = document.querySelectorAll(".photo-item img");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

images.forEach(img => {

img.onclick = () => {

modal.style.display = "flex";
modalImg.src = img.src;

};

});

closeBtn.onclick = () => {
modal.style.display = "none";
};

modal.onclick = () => {
modal.style.display = "none";
};