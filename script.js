// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    // Function to reveal sections when scrolled into view
    function revealSections() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                section.classList.add("visible");
            }
        });
    }

    // Make sure the first section is visible immediately
    document.querySelector("#hero").classList.add("visible");

    // Run reveal function on page load and when scrolling
    revealSections();
    window.addEventListener("scroll", revealSections);
});

// Typing Effect for Hero Section
const text = "Akshayjith P S";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
    }
}

// Start typing effect once the DOM is loaded
document.addEventListener("DOMContentLoaded", typeEffect);

// Handle "H" Key Press - Activate Hacking Mode
document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "h") {
        document.body.classList.add("hacking-mode");

        // Show hacking alert
        let alertBox = document.getElementById("hacking-alert");
        alertBox.innerText = "⚠️ SYSTEM BREACH DETECTED! 🔴 \nEncrypting all files… 95% complete... 💀 ERROR: Just kidding! You’re safe… for now.";
        alertBox.classList.add("show");

        // Hide alert after 3 seconds
        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 3000);

        // Reset hacking mode after 3 seconds
        setTimeout(() => {
            document.body.classList.remove("hacking-mode");
        }, 3000);
    }
});

// Handle "SHIFT + F" - Redirect to Flappy Bird
document.addEventListener("keydown", function (event) {
    if (event.shiftKey && event.key.toLowerCase() === "f") {
        event.preventDefault(); // Prevents the default action
        window.location.href = "https://flappybird.io/"; // Redirects to Flappy Bird
    }
});

// Function to check if the device is mobile-sized
function isMobile() {
    return window.innerWidth <= 768;
}

// Handle Click on "Don't Press H" (Only for Mobile Users)
document.getElementById("hack-trigger").addEventListener("click", function () {
    if (isMobile()) {
        document.body.classList.add("hacking-mode");

        // Show hacking alert
        let alertBox = document.getElementById("hacking-alert");
        alertBox.innerText = "⚠️ SYSTEM BREACH DETECTED! 🔴 Encrypting all files… 95% complete... 💀 ERROR: Just kidding! You’re safe… for now.";
        alertBox.classList.add("show");

        // Hide alert after 3 seconds
        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 3000);

        // Reset hacking mode after 3 seconds
        setTimeout(() => {
            document.body.classList.remove("hacking-mode");
        }, 3000);
    }
});

// Handle Click on "Press SHIFT + F" (Only for Mobile Users)
document.getElementById("flappy-trigger").addEventListener("click", function () {
    if (isMobile()) {
        window.location.href = "https://flappybird.io/";
    }
});
