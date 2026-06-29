    document.addEventListener("DOMContentLoaded", function () {
        // ==========================================
        // CAROUSEL 1: Data-Driven (#carousel)
        // ==========================================
        const track = document.getElementById('carousel');
        
        if (track) {
            const data = [
                { label: "লোক-সংস্কৃতি", img: "https://placehold.co/400x600/5A1737/white?text=Dance" },
                { label: "পৰিৱেশ", img: "https://placehold.co/400x600/5A1737/white?text=Nature" },
                { label: "সমাজ", img: "https://placehold.co/400x600/5A1737/white?text=Society" },
                { label: "সংস্কৃতি", img: "https://placehold.co/400x600/5A1737/white?text=Culture" },
                { label: "স্থাপত্য", img: "https://placehold.co/400x600/5A1737/white?text=Temple" }
            ];

            let currentDataIndex = 2;
            const totalData = data.length;

            function renderDataCarousel() {
                track.innerHTML = '';
                
                data.forEach((item, i) => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    
                    // Applied safe modulo math to prevent negative index bug
                    if (i === currentDataIndex) {
                        card.classList.add('active');
                    } else if (i === (currentDataIndex - 1 + totalData) % totalData) {
                        card.classList.add('left1');
                    } else if (i === (currentDataIndex + 1) % totalData) {
                        card.classList.add('right1');
                    } else {
                        card.style.opacity = '0';
                    }

                    card.innerHTML = `
                        <img src="${item.img}" alt="${item.label}">
                        <div class="label">${item.label}</div>
                    `;
                    track.appendChild(card);
                });
            }

            setInterval(() => {
                currentDataIndex = (currentDataIndex + 1) % totalData;
                renderDataCarousel();
            }, 5000);

            renderDataCarousel();
        }

        // ==========================================
        // CAROUSEL 2: DOM-Driven (.cmp-slide)
        // ==========================================
        const slides = document.querySelectorAll(".cmp-slide");
        
        if (slides.length > 0) {
            let currentSlideIndex = 0;
            const totalSlides = slides.length;

            function renderDOMCarousel() {
                // Reset all classes
                slides.forEach(slide => {
                    slide.className = "cmp-slide";
                });

                // Assign active and side classes
                slides[currentSlideIndex].classList.add("active");

                slides[(currentSlideIndex - 1 + totalSlides) % totalSlides].classList.add("left1");
                slides[(currentSlideIndex - 2 + totalSlides) % totalSlides].classList.add("left2");
                slides[(currentSlideIndex - 3 + totalSlides) % totalSlides].classList.add("left3");

                slides[(currentSlideIndex + 1) % totalSlides].classList.add("right1");
                slides[(currentSlideIndex + 2) % totalSlides].classList.add("right2");
                slides[(currentSlideIndex + 3) % totalSlides].classList.add("right3");
            }

            // Initialization
            renderDOMCarousel();

            // Button Listeners (with existence checks)
            const nextBtn = document.getElementById("nextBtn");
            if (nextBtn) {
                nextBtn.addEventListener("click", function () {
                    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
                    renderDOMCarousel();
                });
            }

            const prevBtn = document.getElementById("prevBtn");
            if (prevBtn) {
                prevBtn.addEventListener("click", function () {
                    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                    renderDOMCarousel();
                });
            }

            // Auto-rotate
            setInterval(function () {
                currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
                renderDOMCarousel();
            }, 5000);
        }

    });
