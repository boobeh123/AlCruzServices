const navToggle = document.querySelector('.navToggle');
const navMenu = document.querySelector('.navMenu');
const navLinks = document.querySelectorAll('.navLink');

const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navMenu.setAttribute('data-open', 'false');
    document.body.classList.remove('navOpen');
};

const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    navMenu.setAttribute('data-open', 'true');
    document.body.classList.add('navOpen');
};

navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

document.addEventListener('keydown', (event) => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (event.key === 'Escape' && isOpen) {
        closeMenu();
        navToggle.focus();
    }
});