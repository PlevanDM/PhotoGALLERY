document.addEventListener("DOMContentLoaded", function() {

    // --- Lightbox Functionality ---
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                document.body.appendChild(lightbox);

                const lightboxImage = document.createElement('img');
                lightboxImage.src = e.target.src;
                lightbox.appendChild(lightboxImage);

                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
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


    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
