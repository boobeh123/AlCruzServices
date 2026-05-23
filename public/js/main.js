const navToggle = document.querySelector('.navToggle');
const navMenu = document.querySelector('.navMenu');
const navLinks = document.querySelectorAll('.navLink');
const contactForm = document.querySelector('.contactForm');
const formStatus = document.querySelector('#formStatus');
const footerYear = document.querySelector('#footerYear');
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