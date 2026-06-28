document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
});
