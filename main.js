// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 1000);
    }, 1500);
});

// Star Particle Background
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5,
            opacity: Math.random()
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
        
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0) star.opacity = 0;
        if (star.opacity > 1) star.opacity = 1;
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();

// Slide Navigation
let currentSlide = 1;

function nextSlide(slideNum) {
    const currentEl = document.getElementById(`slide-${currentSlide}`);
    const nextEl = document.getElementById(`slide-${slideNum}`);
    
    currentEl.classList.remove('active');
    setTimeout(() => {
        nextEl.classList.add('active');
        currentSlide = slideNum;
        
        // Trigger specific slide animations
        if (slideNum === 3) {
            createFloatingStars();
        }
        if (slideNum === 4) {
            animatePoem();
        }
        if (slideNum === 5) {
            createConfetti();
        }
    }, 500);
}

// Slide 3: Floating Stars
function createFloatingStars() {
    const container = document.querySelector('.floating-stars-container');
    container.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.innerHTML = '✦';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(star);
    }
}

// Poem Animation
function animatePoem() {
    const lines = document.querySelectorAll('.poem-line');
    lines.forEach((line, index) => {
        line.classList.remove('visible'); // Reset
        setTimeout(() => {
            line.classList.add('visible');
        }, index * 1500); // 1.5s delay between lines
    });
}

// Confetti Effect for Final Slide
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    container.innerHTML = '';
    const colors = ['#fbc2eb', '#a6c1ee', '#e0c3fc', '#ffffff', '#ffd700'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.position = 'absolute';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.opacity = Math.random();
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        container.appendChild(confetti);
    }
}

// Add Confetti Fall Animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Music Toggle
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = '♪';
    } else {
        music.play().catch(e => console.log("Music play blocked by browser. Need user interaction."));
        musicBtn.innerHTML = '⏸';
    }
    isPlaying = !isPlaying;
});

// Expose nextSlide to global scope
window.nextSlide = nextSlide;
