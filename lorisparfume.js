// 1. Scroll Reveal Animations Observer
function revealOnScroll() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // Trigger distance in pixels
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Trigger initial check on load

// 2. Translucent Navbar Scroll Behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-loris-black', 'shadow-md');
        navbar.classList.remove('bg-transparent', 'py-4');
        navbar.classList.add('py-2');
    } else {
        navbar.classList.remove('bg-loris-black', 'shadow-md');
        navbar.classList.add('bg-transparent', 'py-4');
        navbar.classList.remove('py-2');
    }
});

// 3. Interactive Fragrance Modal Window Logic
const modal = document.getElementById('fragranceModal');
const modalBox = document.getElementById('modalBox');

function openNotesModal(title, gender, top, heart, base) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalGender').innerText = gender;
    document.getElementById('modalTop').innerText = top;
    document.getElementById('modalHeart').innerText = heart;
    document.getElementById('modalBase').innerText = base;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
    
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalBox.classList.remove('scale-95');
        modalBox.classList.add('scale-100');
    }, 10);
}

function closeNotesModal() {
    modal.classList.add('opacity-0');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    document.body.classList.remove('modal-open');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeNotesModal();
    }
});

// 4. Interactive Canvas Perfume Mist Vapor Particle Effects
const canvas = document.getElementById('mistCanvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.opacity = Math.random() * 0.5;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(107, 62, 153, ${this.opacity})`; // Soft loris luxury purple tone
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        this.y -= this.directionY;
        this.x += this.directionX;
        
        if(this.y < 0) {
            this.y = canvas.height;
            this.opacity = Math.random() * 0.5;
        }
        
        this.draw();
    }
}

function initCanvas() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) + 0.5; 
        let color = '#6B3E99';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initCanvas();
});

initCanvas();
animateCanvas();
