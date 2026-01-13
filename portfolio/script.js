document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu = document.querySelector('.icon-menu');
    const iconClose = document.querySelector('.icon-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('open');
        
        if (isOpen) {
            mobileMenu.classList.remove('open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            iconMenu.style.display = 'block';
            iconClose.style.display = 'none';
            mobileNavLinks.forEach(link => link.setAttribute('tabindex', '-1'));
        } else {
            mobileMenu.classList.add('open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Fechar menu');
            iconMenu.style.display = 'none';
            iconClose.style.display = 'block';
            mobileNavLinks.forEach(link => link.setAttribute('tabindex', '0'));
        }
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        iconMenu.style.display = 'block';
        iconClose.style.display = 'none';
        mobileNavLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    menuToggle.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
            menuToggle.focus();
        }
    });
});
