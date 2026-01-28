// Detect touch device
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Magic Mouse Effect (Desktop only)
if (!isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.classList.add('magic-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Create sparkles occasionally to prevent lag
        if (Math.random() > 0.85) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('magic-particle');
        document.body.appendChild(particle);

        const xOffset = (Math.random() - 0.5) * 20;
        const yOffset = (Math.random() - 0.5) * 20;

        particle.style.left = (x + xOffset) + 'px';
        particle.style.top = (y + yOffset) + 'px';

        setTimeout(() => particle.remove(), 800);
    }

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursor.style.background = 'var(--main-color)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'transparent';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Skills animation
            if (entry.target.classList.contains('skills-column')) {
                showProgress();
            }
            // Projects animation
            if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
            // Reveal animation
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

// Observe skills section
const skillsSection = document.querySelector('.skills-column');
if (skillsSection) observer.observe(skillsSection);

// Observe project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => observer.observe(card));

// Observe reveal elements
const revealElements = document.querySelectorAll('section, .heading, .service-box, .about-container, .contact-links');
revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Skills progress animation
function showProgress() {
    const progressBars = document.querySelectorAll('.skill-bar .bar span');
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.width;
        if (value) {
            progressBar.style.width = value;
            progressBar.style.boxShadow = '0 0 10px var(--main-color)';
        }
    });
}

function hideProgress() {
    const progressBars = document.querySelectorAll('.skill-bar .bar span');
    progressBars.forEach(p => {
        p.style.width = '0';
        p.style.boxShadow = 'none';
    });
}

// Mobile Menu
const menuIcon = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });
}

// Active navigation on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (id && top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // Sticky header
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    // Close mobile menu on scroll
    if (menuIcon && navbar) {
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
}, { passive: true });

