const menuButton = document.querySelector('#menu');
const navElement = document.querySelector('nav');

// Initialize button content
menuButton.innerHTML = '&#9776;'; // Hamburger symbol

menuButton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    menuButton.classList.toggle('open');
    
    // Switch between ☰ and X
    if (navElement.classList.contains('open')) {
        menuButton.innerHTML = '&#10005;'; // 'X' symbol
    } else {
        menuButton.innerHTML = '&#9776;'; // Hamburger symbol
    }
});