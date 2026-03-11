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


/* SCROLL REVEAL */

const revealGroups = [
{ selector: ".hero-card", classes: ["reveal-zoom"] },
{ selector: ".journey-copy", classes: ["reveal-left"] },
{ selector: ".memory-book-shell", classes: ["reveal-right", "delay-1"] },
{ selector: ".about-text", classes: ["reveal-left"] },
{ selector: ".about-image", classes: ["reveal-right", "delay-1"] },
{ selector: ".gallery-section .section-title", classes: [] },
{ selector: ".photo-item", classes: ["reveal-zoom"] },
{ selector: ".wish-card", classes: ["reveal-zoom"] }
];

function setupScrollReveal(){

document.body.classList.add("is-ready");

revealGroups.forEach(({ selector, classes }) => {

document.querySelectorAll(selector).forEach((element, index) => {

element.classList.add("scroll-reveal", ...classes);

if (selector === ".photo-item") {
element.classList.add(`delay-${(index % 3) + 1}`);
}

});

});

const revealItems = document.querySelectorAll(".scroll-reveal");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
revealItems.forEach(item => item.classList.add("is-visible"));
return;
}

const revealObserver = new IntersectionObserver((entries, observer) => {

entries.forEach(entry => {

if (!entry.isIntersecting) {
return;
}

entry.target.classList.add("is-visible");
observer.unobserve(entry.target);

});

}, {
threshold: 0.18,
rootMargin: "0px 0px -8% 0px"
});

revealItems.forEach(item => revealObserver.observe(item));

}

setupScrollReveal();


/* JOURNEY BOOK */

const bookPages = document.querySelectorAll(".book-page");
const prevPageButton = document.getElementById("bookPrev");
const nextPageButton = document.getElementById("bookNext");
const currentPageElement = document.getElementById("bookCurrent");
const totalPageElement = document.getElementById("bookTotal");

if (bookPages.length && prevPageButton && nextPageButton && currentPageElement && totalPageElement) {

let currentPage = 0;
let isAnimating = false;
const totalPages = bookPages.length;

totalPageElement.textContent = totalPages;

function updateBookState(){

currentPageElement.textContent = currentPage + 1;
prevPageButton.disabled = currentPage === 0 || isAnimating;
nextPageButton.disabled = currentPage === bookPages.length - 1 || isAnimating;

}

function clearFlipClasses(page){
page.classList.remove("is-entering-next", "is-entering-prev", "is-leaving-next", "is-leaving-prev");
}

function goToPage(nextIndex){

if (isAnimating || nextIndex === currentPage || nextIndex < 0 || nextIndex >= bookPages.length) {
return;
}

isAnimating = true;

const current = bookPages[currentPage];
const next = bookPages[nextIndex];
const isNext = nextIndex > currentPage;

clearFlipClasses(current);
clearFlipClasses(next);

next.classList.remove("is-active");
next.classList.add(isNext ? "is-entering-next" : "is-entering-prev");

requestAnimationFrame(() => {
current.classList.add(isNext ? "is-leaving-next" : "is-leaving-prev");
next.classList.add("is-active");
next.classList.remove(isNext ? "is-entering-next" : "is-entering-prev");
});

setTimeout(() => {
current.classList.remove("is-active", "is-leaving-next", "is-leaving-prev");
clearFlipClasses(next);

currentPage = nextIndex;
isAnimating = false;
updateBookState();
}, 860);

updateBookState();

}

function goToNextPage(){
goToPage(currentPage + 1);
}

function goToPreviousPage(){
goToPage(currentPage - 1);
}

nextPageButton.addEventListener("click", goToNextPage);
prevPageButton.addEventListener("click", goToPreviousPage);

bookPages.forEach((page, index) => {
page.classList.remove("is-active", "is-entering-next", "is-entering-prev", "is-leaving-next", "is-leaving-prev");
if (index === 0) {
page.classList.add("is-active");
}
});

document.addEventListener("keydown", (event) => {

if (event.key === "ArrowRight") {
goToNextPage();
}

if (event.key === "ArrowLeft") {
goToPreviousPage();
}

});

updateBookState();

}


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



/* COUNTDOWN */

// 👉 Đổi ngày tốt nghiệp tại đây
const GRADUATION_DATE = new Date('2026-03-28T08:00:00');

function updateCountdown(){

const now = new Date();
const diff = GRADUATION_DATE - now;

if(diff <= 0){
document.getElementById('countdownGrid').style.display = 'none';
document.getElementById('countdownDone').style.display = 'block';
launchCornerFireworks();
return;
}

const days    = Math.floor(diff / (1000*60*60*24));
const hours   = Math.floor((diff / (1000*60*60)) % 24);
const minutes = Math.floor((diff / (1000*60)) % 60);
const seconds = Math.floor((diff / 1000) % 60);

document.getElementById('cdDays').textContent    = String(days).padStart(2,'0');
document.getElementById('cdHours').textContent   = String(hours).padStart(2,'0');
document.getElementById('cdMinutes').textContent = String(minutes).padStart(2,'0');
document.getElementById('cdSeconds').textContent = String(seconds).padStart(2,'0');

}

updateCountdown();
setInterval(updateCountdown, 1000);

let cornerFireworksActive = false;

function launchCornerFireworks(){
if(cornerFireworksActive) return;
cornerFireworksActive = true;

setInterval(()=>{

// Góc dưới trái
createFirework(canvas.width * 0.05, canvas.height * 0.85);
createFirework(canvas.width * 0.10, canvas.height * 0.70);

// Góc dưới phải
createFirework(canvas.width * 0.95, canvas.height * 0.85);
createFirework(canvas.width * 0.90, canvas.height * 0.70);

},500);

}


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