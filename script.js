// Initialisation des animations AOS
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des animations
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        mirror: true
    });

    // Filtres de cours
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            courseCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animation des statistiques
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-count'));
                animateValue(target, 0, endValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Slider témoignages
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentSlide = 0;

    // Créer les points de navigation
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        const slideWidth = testimonials[0].offsetWidth + 32; // Width + gap
        testimonialTrack.style.transform = `translateX(-${slideWidth * index}px)`;

        // Mettre à jour les points
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    }

    // Auto-play du slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    }, 5000);

    // Gestion du menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navAuth = document.querySelector('.nav-auth');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navAuth.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Fermer le menu quand on clique sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Fermer le menu quand on redimensionne l'écran au-dessus de 991px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Animation de la navbar au scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ajoute/retire la classe scrolled pour l'effet de fond
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation des boutons au hover
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Parallax effect pour le hero
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Animation des feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Gestion du sélecteur de langue
    const languageSelector = document.querySelector('.language-selector');
    const currentLang = document.querySelector('.current-lang');
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            const langText = option.textContent.trim();

            // Mise à jour du texte et du drapeau
            currentLang.textContent = lang.toUpperCase();
            const currentFlag = document.querySelector('.current-flag');
            // Gestion spéciale pour le wolof qui utilise le drapeau du Sénégal
            const flagCode = lang === 'en' ? 'gb' : (lang === 'wo' ? 'sn' : lang);
            currentFlag.src = `https://flagcdn.com/w20/${flagCode}.png`;
            currentFlag.alt = langText;

            // Mise à jour de la classe active
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Ici, vous pourriez ajouter la logique pour changer la langue du site
            // Par exemple, charger les traductions correspondantes
            document.documentElement.lang = lang;

            // Animation de confirmation
            languageSelector.classList.add('lang-changed');
            setTimeout(() => {
                languageSelector.classList.remove('lang-changed');
            }, 1000);
        });
    });

    // Gestion des onglets média dans la section À propos
    const mediaTabs = document.querySelectorAll('.media-tab');
    const mediaContents = document.querySelectorAll('[data-media-content]');
    const videoWrapper = document.querySelector('.video-wrapper[data-media-content="video"]');
    const video = videoWrapper?.querySelector('video');
    const playButton = videoWrapper?.querySelector('.play-button');
    const overlay = videoWrapper?.querySelector('.video-overlay');
    const discoverVideo = videoWrapper?.querySelector('.discover-video');

    // Gestion des onglets
    mediaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const mediaType = tab.getAttribute('data-media');

            // Mise à jour des onglets actifs
            mediaTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Animation de transition
            mediaContents.forEach(content => {
                if (content.getAttribute('data-media-content') === mediaType) {
                    content.style.opacity = '0';
                    content.classList.add('active');
                    setTimeout(() => {
                        content.style.opacity = '1';
                    }, 50);
                } else {
                    content.classList.remove('active');
                    // Pause la vidéo si on change d'onglet
                    if (content.querySelector('video')) {
                        content.querySelector('video').pause();
                        if (overlay) {
                            overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)';
                            playButton.style.display = 'flex';
                        }
                    }
                }
            });
        });
    });

    // Gestion de la vidéo
    if (playButton && video && overlay) {
        let isPlaying = false;

        playButton.addEventListener('click', () => {
            if (!isPlaying) {
                video.play();
                overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.1))';
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
                video.style.transform = 'scale(1.05)';
            } else {
                video.pause();
                overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))';
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                video.style.transform = 'scale(1)';
            }
            isPlaying = !isPlaying;
        });

        video.addEventListener('ended', () => {
            isPlaying = false;
            overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))';
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            video.style.transform = 'scale(1)';
        });

        // Animation de l'overlay au survol
        videoWrapper.addEventListener('mouseenter', () => {
            if (!isPlaying) {
                overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2))';
            }
        });

        videoWrapper.addEventListener('mouseleave', () => {
            if (!isPlaying) {
                overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))';
            }
        });
    }
});
