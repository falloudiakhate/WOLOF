document.addEventListener('DOMContentLoaded', () => {
    // Initialisation du slider de témoignages
    class TestimonialSlider {
        constructor() {
            this.track = document.querySelector('.testimonial-track');
            this.slides = document.querySelectorAll('.testimonial-card');
            this.dots = document.querySelector('.testimonial-dots');
            this.prevButton = document.querySelector('.arrow-prev');
            this.nextButton = document.querySelector('.arrow-next');
            this.currentIndex = 0;
            this.slideWidth = 0;
            this.slidesToShow = 3;
            this.autoplayInterval = null;

            this.init();
        }

        init() {
            // Créer les points de navigation
            this.createDots();

            // Configuration des événements
            this.setupEventListeners();

            // Configuration initiale
            this.updateSliderConfig();

            // Démarrer l'autoplay
            this.startAutoplay();

            // Recalculer lors du redimensionnement
            window.addEventListener('resize', () => {
                this.updateSliderConfig();
                this.goToSlide(this.currentIndex);
            });
        }

        updateSliderConfig() {
            if (window.innerWidth <= 768) {
                this.slidesToShow = 1;
            } else if (window.innerWidth <= 1200) {
                this.slidesToShow = 2;
            } else {
                this.slidesToShow = 3;
            }

            this.slideWidth = this.track.parentElement.offsetWidth / this.slidesToShow;
            this.slides.forEach(slide => {
                slide.style.flex = `0 0 ${this.slideWidth}px`;
            });
        }

        createDots() {
            const totalDots = Math.ceil(this.slides.length / this.slidesToShow);
            this.dots.innerHTML = '';

            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(i));
                this.dots.appendChild(dot);
            }
        }

        setupEventListeners() {
            if (this.prevButton) {
                this.prevButton.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetAutoplay();
                });
            }

            if (this.nextButton) {
                this.nextButton.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetAutoplay();
                });
            }

            // Gestion du touch
            let touchStartX = 0;
            let touchEndX = 0;

            this.track.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                this.pauseAutoplay();
            }, { passive: true });

            this.track.addEventListener('touchmove', (e) => {
                touchEndX = e.touches[0].clientX;
            }, { passive: true });

            this.track.addEventListener('touchend', () => {
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
                this.startAutoplay();
            });
        }

        goToSlide(index) {
            const totalSlides = Math.ceil(this.slides.length / this.slidesToShow);
            this.currentIndex = index;

            // Gestion de la boucle
            if (this.currentIndex < 0) {
                this.currentIndex = totalSlides - 1;
            } else if (this.currentIndex >= totalSlides) {
                this.currentIndex = 0;
            }

            // Animation du track
            const translateX = -this.currentIndex * (this.slideWidth * this.slidesToShow);
            this.track.style.transform = `translateX(${translateX}px)`;

            // Mise à jour des points
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }

        nextSlide() {
            this.goToSlide(this.currentIndex + 1);
        }

        prevSlide() {
            this.goToSlide(this.currentIndex - 1);
        }

        startAutoplay() {
            this.pauseAutoplay();
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        }

        pauseAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }

        resetAutoplay() {
            this.startAutoplay();
        }
    }

    // Initialiser le slider
    new TestimonialSlider();
});
