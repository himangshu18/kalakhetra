
    // ===== NAVIGATION MENU FUNCTIONALITY (Mega Menu) =====

const menuToggle = document.querySelector(".menu-toggle");
const navbarMenu = document.getElementById("navbarMenu");
const menuClose = document.querySelector(".menu-close");
const siteHeader = document.querySelector("header");

// Anchor the dropdown panel to sit right below the header (whatever its
// current height happens to be) so its close button never renders behind it.
function positionMenuBelowHeader() {
    if (!siteHeader) return;
    const offset = Math.max(siteHeader.getBoundingClientRect().bottom, 0);
    navbarMenu.style.top = offset + "px";
    navbarMenu.style.height = `calc(100% - ${offset}px)`;
}

// Open/Close Menu
menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    const isOpening = !navbarMenu.classList.contains("active");
    if (isOpening) positionMenuBelowHeader();
    navbarMenu.classList.toggle("active");
});

// Keep the panel aligned with the header if the viewport is resized while open
window.addEventListener("resize", function () {
    if (navbarMenu.classList.contains("active")) positionMenuBelowHeader();
});

// Close Menu
menuClose.addEventListener("click", function (e) {
    e.preventDefault();
    navbarMenu.classList.remove("active");
});

// Close Menu when clicking on the dimmed backdrop (outside the menu panel)
navbarMenu.addEventListener("click", function (e) {
    if (e.target === navbarMenu) {
        navbarMenu.classList.remove("active");
    }
});

// Close menu on Escape key press
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        navbarMenu.classList.remove("active");
    }
});
