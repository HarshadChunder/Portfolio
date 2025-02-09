// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');

// Theme Management
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Particle Configurations
const particleConfigs = {
    dark: {
        particles: {
            number: { value: 80 },
            color: { value: "#ffffff" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            }
        }
    },
    light: {
        particles: {
            number: { value: 70 },
            color: { value: "#2997FF" },
            opacity: { value: 0.4 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#2997FF",
                opacity: 0.4,
                width: 1
            }
        }
    },
    common: {
        particles: {
            shape: { type: "circle" },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "bounce",
                bounce: true
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: { opacity: 1 }
                },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    }
};

// Functions
const mergeConfigs = (theme) => ({
    ...particleConfigs.common,
    particles: {
        ...particleConfigs.common.particles,
        ...particleConfigs[theme].particles,
        line_linked: {
            ...particleConfigs.common.particles.line_linked,
            ...particleConfigs[theme].particles.line_linked
        }
    }
});

const updateParticles = (theme) => {
    if (window.pJSDom?.[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    particlesJS('particles-js', mergeConfigs(theme));
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateParticles(newTheme);
};

// Intersection Observer for animations
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('.skill-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    },
    { threshold: 0.1 }
);

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateParticles(currentTheme);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => observer.observe(section));
});

// Scroll effects
window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});

// Theme toggle handlers
[themeToggle, themeToggleMobile].forEach(toggle => 
    toggle.addEventListener('click', toggleTheme)
);

// System theme change handler
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateParticles(newTheme);
    }
});

// Mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});
