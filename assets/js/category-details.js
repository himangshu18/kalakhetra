document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.cd-section');

    // --- Show the section matching the ?cat= query param (defaults to first) ---
    const params = new URLSearchParams(window.location.search);
    let activeCat = params.get('cat');

    const validCats = Array.from(sections).map(s => s.getAttribute('data-cat'));
    if (!validCats.includes(activeCat)) {
        activeCat = validCats[0];
    }

    sections.forEach(section => {
        section.classList.toggle('active', section.getAttribute('data-cat') === activeCat);
    });
});
