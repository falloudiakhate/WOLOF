document.addEventListener('DOMContentLoaded', function () {
    // Initialisation de AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Animation des statistiques
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-count'));
                    animateValue(target, 0, finalValue, 2000);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    };

    // Fonction d'animation des nombres
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = easeOutExpo(progress);
            const currentValue = Math.floor(easeProgress * (end - start) + start);
            element.textContent = new Intl.NumberFormat().format(currentValue);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Fonction d'easing pour une animation plus naturelle
    const easeOutExpo = (x) => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    // Animation des éléments statistiques au scroll
    const statsSection = document.querySelector('.statistics');
    const statItems = document.querySelectorAll('.stat-item');
    const observerStats = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 200);
            });
            animateStats();
            observerStats.unobserve(entries[0].target);
        }
    }, { threshold: 0.3 });

    if (statsSection) {
        observerStats.observe(statsSection);
    }
});
