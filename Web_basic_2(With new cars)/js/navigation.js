
// =====================================
// GAADI SARATHI - MULTI PAGE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

// MOBILE MENU

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

    // CLOSE MENU AFTER CLICKING A LINK

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

    // CLOSE MENU WHEN CLICKING OUTSIDE

    document.addEventListener("click", event => {

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}

// NAVBAR SCROLL EFFECT

function updateNavbar() {

    if (!navbar) return;

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();

// HIGHLIGHT CURRENT PAGE

const currentPage = window.location.pathname
    .split("/")
    .pop() || "index.html";

if (navLinks) {

    navLinks.querySelectorAll("a").forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });

}
