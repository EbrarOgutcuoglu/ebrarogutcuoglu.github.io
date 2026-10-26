window.addEventListener('DOMContentLoaded', async () => {

    const sections = [
        { id: 'section-about', file: 'sections/about.html' },
        { id: 'section-experience', file: 'sections/experience.html' },
        { id: 'section-projects', file: 'sections/projects.html' },
        { id: 'section-education', file: 'sections/education.html' },
        { id: 'section-skills', file: 'sections/skills.html' },
        { id: 'section-certifications', file: 'sections/certifications.html' },
        { id: 'section-interests', file: 'sections/interests.html' }
    ];

    for (const sec of sections) {
        try {
            const response = await fetch(sec.file);
            if (response.ok) {
                document.getElementById(sec.id).innerHTML = await response.text();
            }
        } catch (error) {
            console.error(`Error loading ${sec.file}:`, error);
        }
    }

    // Initialize ScrollSpy after dynamic HTML loading
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav && window.bootstrap) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Auto-collapse navbar on click (mobile)
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});