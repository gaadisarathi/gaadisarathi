
/* =====================================
   GAADI SARATHI - JAVASCRIPT
===================================== */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// NAVBAR SCROLL EFFECT

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleScroll);

handleScroll();


// MOBILE NAVIGATION

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


// CLOSE MOBILE MENU WHEN LINK IS CLICKED

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// CLOSE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// ACTIVE NAVIGATION LINK

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navigationLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") ===
                    `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });

        }

    });

}, {
    threshold: 0.35
});

sections.forEach(section => {
    observer.observe(section);
});


// GAADI SARATHI - GLOBAL SCRIPTS

// AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
