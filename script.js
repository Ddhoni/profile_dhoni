/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SPA NAVIGATION ====================*/
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav__link, .footer__link');

function switchSection(targetId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active-section');
    });

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }

    // Update active link state
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active-link');
        }
    });
}

// Add click event to all nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        switchSection(targetId);

        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) navMenu.classList.remove('show-menu');
    });
});

// Initialize Home
document.addEventListener('DOMContentLoaded', () => {
    switchSection('home');
});

/*==================== SHOW SCROLL UP ====================*/
// Not needed in SPA mode as sections scroll internally, but we can keep it if we bind it to the active section's scroll
// For now, we can disable it or adapt it. Let's disable global scroll listener.

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const revealElements = document.querySelectorAll('.home__content, .about__img, .about__data, .project__card, .certificate__card, .contact__content');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

/*==================== CONTACT FORM ====================*/
/*==================== CONTACT FORM ====================*/
// Contact section has been removed.

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'

// We validate if the user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    // Update icon on load
    if (selectedTheme === 'dark') {
        // We need to wait for feather to load or just set it manually if feather.replace hasn't run
        // But since this runs after DOM content loaded (usually), feather might have run or will run.
        // Safest is to let feather run, then update.
        // Or just rely on the click to swap.
        // Let's try to set the correct icon if possible.
    }
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)

        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())

        // Change icon
        if (document.body.classList.contains(darkTheme)) {
            themeButton.innerHTML = feather.icons['sun'].toSvg();
        } else {
            themeButton.innerHTML = feather.icons['moon'].toSvg();
        }
    })
}

// Ensure icon is correct on load after Feather runs
window.addEventListener('load', () => {
    if (document.body.classList.contains(darkTheme)) {
        themeButton.innerHTML = feather.icons['sun'].toSvg();
    }
});
