console.log('FlowSpace SaaS Script Loaded');

let currentLang = 'en';

// ==================== LANGUAGE SYSTEM ====================
function applyLanguage(lang) {
    console.log('Applying language:', lang);
    currentLang = lang;
    
    const elements = document.querySelectorAll('[data-en][data-gr]');
    elements.forEach(element => {
        const text = element.getAttribute('data-' + lang);
        
        if (element.tagName === 'INPUT' && element.type !== 'submit') {
            const placeholder = element.getAttribute('data-' + lang + '-placeholder');
            if (placeholder) element.placeholder = placeholder;
        } else if (element.tagName === 'TEXTAREA') {
            const placeholder = element.getAttribute('data-' + lang + '-placeholder');
            if (placeholder) element.placeholder = placeholder;
        } else {
            element.textContent = text;
        }
    });
    
    localStorage.setItem('flowspace_lang', lang);
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==================== DEMO MODAL ====================
function initDemoModal() {
    const demoBtn = document.querySelector('.demo-btn');
    const demoModal = document.querySelector('.demo-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (demoBtn && demoModal) {
        demoBtn.addEventListener('click', function() {
            demoModal.classList.add('active');
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                demoModal.classList.remove('active');
            });
        }
        
        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                demoModal.classList.remove('active');
            }
        });
    }
}

// ==================== PRICING TOGGLE ====================
function initPricingToggle() {
    const monthlyBtn = document.querySelector('.toggle-monthly');
    const yearlyBtn = document.querySelector('.toggle-yearly');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    if (monthlyBtn && yearlyBtn) {
        monthlyBtn.addEventListener('click', function() {
            monthlyBtn.classList.add('active');
            yearlyBtn.classList.remove('active');
            monthlyPrices.forEach(p => p.style.display = 'inline');
            yearlyPrices.forEach(p => p.style.display = 'none');
        });
        
        yearlyBtn.addEventListener('click', function() {
            yearlyBtn.classList.add('active');
            monthlyBtn.classList.remove('active');
            monthlyPrices.forEach(p => p.style.display = 'none');
            yearlyPrices.forEach(p => p.style.display = 'inline');
        });
    }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert(currentLang === 'en' 
                ? 'Message sent successfully! (This is a demo)' 
                : 'Το μήνυμα στάλθηκε επιτυχώς! (Αυτό είναι demo)');
            this.reset();
        });
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing FlowSpace');
    
    // Initialize language
    const savedLang = localStorage.getItem('flowspace_lang') || 'en';
    currentLang = savedLang;
    
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Language switching
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyLanguage(lang);
        });
    });
    
    applyLanguage(savedLang);
    
    // Initialize features
    initMobileMenu();
    initDemoModal();
    initPricingToggle();
    initContactForm();
    
    console.log('Initialization complete');
});
