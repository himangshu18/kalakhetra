
    // ===== NAVIGATION MENU FUNCTIONALITY =====

const menuToggle = document.querySelector(".menu-toggle");
const navbarMenu = document.getElementById("navbarMenu");
const menuClose = document.querySelector(".menu-close");
const menuParents = document.querySelectorAll(".menu-parent");

// Open Menu
menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    navbarMenu.classList.add("active");
});

// Close Menu
menuClose.addEventListener("click", function (e) {
    e.preventDefault();
    navbarMenu.classList.remove("active");
});

// Close Menu when clicking on overlay
navbarMenu.addEventListener("click", function (e) {
    if (e.target === navbarMenu) {
        navbarMenu.classList.remove("active");
    }
});

// Toggle Submenus
menuParents.forEach(parent => {
    parent.addEventListener("click", function (e) {
        e.preventDefault();
        
        const submenu = this.nextElementSibling;
        const toggleIcon = this.querySelector(".toggle-icon");
        
        // Close all other submenus
        menuParents.forEach(otherParent => {
            if (otherParent !== this) {
                otherParent.nextElementSibling.classList.remove("active");
                otherParent.querySelector(".toggle-icon").classList.remove("active");
            }
        });

        // Toggle current submenu
        submenu.classList.toggle("active");
        toggleIcon.classList.toggle("active");
    });
});

// Close menu when clicking on a submenu item
const submenuLinks = document.querySelectorAll(".submenu li a");
submenuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        // Optional: uncomment to close entire menu when submenu item is clicked
        // navbarMenu.classList.remove("active");
    });
});
