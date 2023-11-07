document.querySelector('.nav-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle('openNav');
    e.currentTarget.classList.toggle('active');
});
