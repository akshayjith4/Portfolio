document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");

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

    // Run when page loads and on scroll
    revealSections();
    window.addEventListener("scroll", revealSections);
});
const text = "Akshayjith P S";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);
document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "h") {
        document.body.classList.add("hacking-mode");

        // Show hacking alert
        let alertBox = document.getElementById("hacking-alert");
        alertBox.innerText = "⚠️ SYSTEM BREACH DETECTED! 🔴 \nEncrypting all files… 95% complete... 💀 ERROR: Just kidding! You’re safe… for now. 😏";
        alertBox.classList.add("show");

        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 3000); // Hide after 2 seconds

        // Reset hacking mode after 6 seconds
        setTimeout(() => {
            document.body.classList.remove("hacking-mode");
        }, 3000);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === "p") {
        event.preventDefault(); // Prevents the print dialog
        window.location.href = "https://flappybird.io/"; // Redirects to Flappy Bird
    }
});


