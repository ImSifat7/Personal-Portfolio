// Magic Mouse Effect
const cursor = document.createElement('div');
cursor.classList.add('magic-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Create sparkles occasionally to not lag
    if (Math.random() > 0.1) { // 90% chance to create particle
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('magic-particle');
    document.body.appendChild(particle);

    // Randomize position slightly
    const xOffset = (Math.random() - 0.5) * 20;
    const yOffset = (Math.random() - 0.5) * 20;

    particle.style.left = (x + xOffset) + 'px';
    particle.style.top = (y + yOffset) + 'px';

    setTimeout(() => {
        particle.remove();
    }, 800);
}

// Add click effect
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursor.style.background = 'var(--main-color)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'transparent';
});

// Skills & Projects Animation on Scroll
const skillsSection = document.querySelector('.skills-column');
const progressBars = document.querySelectorAll('.skill-bar .bar span');
const projectCards = document.querySelectorAll('.project-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate Skills
            if (entry.target.classList.contains('skills-column')) {
                showProgress();
            }
            // Animate Projects (Staggered)
            if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Animate only once
            }
            // Global Reveal Animation
            if (entry.target.classList.contains('reveal')) {
                entry.target.classList.add('active');
            }
        } else {
            if (entry.target.classList.contains('skills-column')) {
                hideProgress();
            }
        }
    });
}, observerOptions);

if (skillsSection) observer.observe(skillsSection);
projectCards.forEach(card => observer.observe(card));

// Observe elements for reveal effect
const revealElements = document.querySelectorAll('section, .heading, .service-box, .about-container, .contact-links');
revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.width;
        progressBar.style.width = value;
        progressBar.style.boxShadow = '0 0 10px var(--main-color)';
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.width = 0;
        p.style.boxShadow = 'none';
    });
}

// Mobile Menu
let menuIcon = document.querySelector('.menu-btn');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};
