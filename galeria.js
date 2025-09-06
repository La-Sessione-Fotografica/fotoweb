document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar en páginas con galería
    const galeriaGrid = document.querySelector('.galeria-grid');
    if (!galeriaGrid) return;

    // Crear el lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev">&lt;</button>
        <button class="lightbox-next">&gt;</button>
        <img class="lightbox-image" src="" alt="Imagen ampliada">
    `;
    document.body.appendChild(lightbox);

    // Elementos del lightbox
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Obtener todas las imágenes de la galería
    const images = Array.from(document.querySelectorAll('.galeria-grid .imagen-card img'));
    let currentIndex = 0;

    // Función para mostrar imagen
    function showImage(index) {
        if (images[index]) {
            currentIndex = index;
            lightboxImage.src = images[index].src;
            lightbox.classList.add('active');
            lightbox.style.display = 'flex';
        }
    }

    // Agregar eventos a las imágenes
    images.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            showImage(index);
        });
    });

    // Cerrar lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    });

    // Navegación
    prevBtn.addEventListener('click', () => {
        showImage((currentIndex - 1 + images.length) % images.length);
    });

    nextBtn.addEventListener('click', () => {
        showImage((currentIndex + 1) % images.length);
    });

    // Cerrar con Escape y navegar con flechas
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeBtn.click();
        }
    });
});
