    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.cat-card');
        const modal = document.getElementById('categoryModal');
        const closeBtn = document.querySelector('.cat-modal-close');
        
        // Elements to populate inside the modal
        const modalHeadingAs = document.getElementById('modalHeadingAs');
        const modalHeadingEn = document.getElementById('modalHeadingEn');
        const modalDetails = document.getElementById('modalDetails');

        // Open modal on card click
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                // 1. Extract Assamese text from the element
                const asTextElement = card.querySelector('.as-text');
                const asText = asTextElement ? asTextElement.innerText : '';
                
                // 2. Extract English text and Details from the data attributes
                const enText = card.getAttribute('data-en') || 'Category';
                const specificDetails = card.getAttribute('data-details') || 'Details coming soon.';
                
                // 3. Populate the modal
                modalHeadingAs.innerText = asText;
                modalHeadingEn.innerText = enText;
                modalDetails.innerText = specificDetails;

                // 4. Show the modal
                modal.classList.add('active');
            });
        });

        // Close modal function
        const closeModal = () => {
            modal.classList.remove('active');
        };

        // Close on 'X' click
        if(closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on clicking outside the modal box
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    });

    const modal = document.getElementById('categoryModal');
    const closeBtn = document.getElementById('closeModalBtn');

    // CLOSE
    const closeModal = () => {
        modal.classList.remove('active');
    };

    // OPEN (keep yours but ensure this)
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    });

    // close button
    closeBtn.addEventListener('click', closeModal);

    // click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
