document.addEventListener("DOMContentLoaded", function() {

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.from('h1', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Gallery animation
    gsap.from('#gallery img', {
        duration: 1,
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#gallery',
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none none reverse'
        }
    });

    // --- Lightbox Functionality ---
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                document.body.appendChild(lightbox);

                const lightboxImage = document.createElement('img');
                const highResSrc = e.target.getAttribute('data-src') || e.target.src;
                lightboxImage.src = highResSrc;
                lightbox.appendChild(lightboxImage);

                const closeLightbox = () => {
                    document.body.removeChild(lightbox);
                    document.removeEventListener('keydown', handleKeyDown);
                };

                const handleKeyDown = (e) => {
                    if (e.key === 'Escape') {
                        closeLightbox();
                    }
                };

                lightbox.addEventListener('click', closeLightbox);
                document.addEventListener('keydown', handleKeyDown);
            }
        });
    }


    // --- Lazy Loading for Images ---
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                let lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.removeAttribute('data-src');
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });

    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });


});
