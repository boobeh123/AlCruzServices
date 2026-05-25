// ─── DOM selectors ────────────────────────────────────────────
const navToggle = document.querySelector('.navToggle');
const navMenu = document.querySelector('.navMenu');
const navLinks = document.querySelectorAll('.navLink');
const contactForm = document.querySelector('.contactForm');
const formStatus = document.querySelector('#formStatus');
const footerYear = document.querySelector('#footerYear');
const siteHeader = document.querySelector('.siteHeader');
const serviceItems = document.querySelectorAll('.serviceItem');
const revealSections = document.querySelectorAll(
    '.aboutInner, .servicesHead, .contactInner, .footerInner'
);

// ─── Helper functions ─────────────────────────────────────────
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

const encodeFormData = (formData) => {
    return [...formData.entries()]
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

const setFormStatus = (message, state) => {
    formStatus.textContent = message;
    formStatus.setAttribute('data-state', state);
};

// ─── Main logic ───────────────────────────────────────────────
const handleContactSubmit = async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('.formSubmit');
    const formData = new FormData(contactForm);

    submitButton.disabled = true;
    setFormStatus('Sending your request…', 'pending');

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeFormData(formData),
        });

        if (!response.ok) {
            throw new Error('Submission failed');
        }

        contactForm.reset();
        setFormStatus('Thank you — your request has been sent. We\'ll be in touch shortly.', 'success');
    } catch (error) {
        setFormStatus('Something went wrong. Please call us at (808) 745-5049 or try again.', 'error');
    } finally {
        submitButton.disabled = false;
    }
};

// Scroll reveal — IntersectionObserver adds .revealFade then .revealed
// rootMargin trims 40px from the bottom so reveals fire just before
// the element fully enters the viewport, keeping motion purposeful.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealSections.forEach((section) => {
    section.classList.add('revealFade');
    revealObserver.observe(section);
});

// Service items get staggered delays so they cascade in one by one
serviceItems.forEach((item, index) => {
    item.classList.add('revealFade');
    item.style.transitionDelay = `${index * 0.12}s`;
    revealObserver.observe(item);
});

// ─── Event listeners ─────────────────────────────────────────
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

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// Adds .scrolled to header after 20px scroll — triggers the
// hairline border + box-shadow defined in CSS
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
    } else {
        siteHeader.classList.remove('scrolled');
    }
}, { passive: true });
