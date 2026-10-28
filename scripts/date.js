// Dynamically populate current year
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Dynamically populate last modified date
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;