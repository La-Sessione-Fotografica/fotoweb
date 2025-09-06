document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar si hay imágenes de servicios
    const servicioImagenes = document.querySelectorAll('.servicio-img img');
    
    if (servicioImagenes.length > 0) {
        // Asegurarse de que el modal exista
        let modal = document.getElementById('imagenModal');
        if (!modal) {
            // Crear el modal si no existe
            modal = document.createElement('div');
            modal.id = 'imagenModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="cerrar-modal">&times;</span>
                <img class="modal-contenido" id="imgModal">
            `;
            modal.style.display = 'none'; // Asegurarse de que el modal esté oculto inicialmente
            document.body.appendChild(modal);
        }
    
        const modalImg = document.getElementById('imgModal');
        const span = modal.querySelector('.cerrar-modal');
        
        // Agregar evento click a cada imagen de servicio
        servicioImagenes.forEach(img => {
            img.onclick = function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            }
        });
    
        // Cerrar modal con la X
        span.onclick = function() {
            modal.style.display = 'none';
        }
        
        // Cerrar modal clickeando fuera
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});
