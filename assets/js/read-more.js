document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('aboutReadMoreBtn');
    const extra = document.getElementById('aboutExtra');
    if (!btn || !extra) return;

    const label = btn.querySelector('.btn-read-more-text');

    btn.addEventListener('click', () => {
        const isExpanded = extra.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', String(isExpanded));
        if (label) label.textContent = isExpanded ? 'Read Less' : 'Read More';
    });
});
