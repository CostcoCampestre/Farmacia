(function () {
  // 1) Capturamos los elementos del carrusel
  const carouselContainer = document.getElementById('carousel');
  const carouselImages    = carouselContainer.querySelectorAll('img');
  const indicatorsWrapper = document.getElementById('indicators');
  const prevBtn           = document.getElementById('prevBtn');
  const nextBtn           = document.getElementById('nextBtn');
  const totalImages       = carouselImages.length;
  let index = 0;

  // 2) Crear dinámicamente los indicadores (dots) según la cantidad de imágenes
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', `Imagen ${i + 1}`);
    indicatorsWrapper.appendChild(dot);
  }

  // Recolectamos los indicadores recién creados
  const dots = indicatorsWrapper.querySelectorAll('.indicator');

  // 3) Función para mostrar la imagen en el carrusel y actualizar clases
  const showImage = (i) => {
    if (i < 0) i = totalImages - 1;
    if (i >= totalImages) i = 0;

    carouselImages.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    carouselImages[i].classList.add('active');
    dots[i].classList.add('active');
    index = i;
  };

  // 4) Eventos para botones anterior y siguiente del carrusel
  prevBtn.addEventListener('click', () => showImage(index - 1));
  nextBtn.addEventListener('click', () => showImage(index + 1));

  // 5) Evento para cada indicador (dot) recién creado
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const i = parseInt(dot.getAttribute('data-index'), 10);
      showImage(i);
    });
  });

  // 6) Auto‐avance cada 5 segundos
  setInterval(() => showImage(index + 1), 5000);

  // ───────────────────── Funcionalidad del Modal ─────────────────────
  const modal       = document.getElementById('imageModal');
  const modalImg    = document.getElementById('modalImage');
  const closeBtn    = document.querySelector('.modal-close');
  const prevModal   = document.querySelector('.modal-prev');
  const nextModal   = document.querySelector('.modal-next');

  // Cuando se hace clic en cualquier imagen del carrusel:
  carouselImages.forEach(img => {
    img.addEventListener('click', (e) => {
      // Capturamos el índice real de la imagen clicada:
      const clickedIndex = Array.prototype.indexOf.call(carouselImages, e.currentTarget);
      index = clickedIndex;
      modalImg.src = e.currentTarget.src;
      modal.style.display = 'flex';
    });
  });

  // Cerrar modal al hacer clic en la “X”
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal si se clickea fuera de .modal-inner (fondo oscuro)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Función para mostrar siguiente imagen dentro del modal
  const showNextInModal = () => {
    index = (index + 1) % totalImages;
    modalImg.src = carouselImages[index].src;
  };

  // Función para mostrar imagen anterior dentro del modal
  const showPrevInModal = () => {
    index = (index - 1 + totalImages) % totalImages;
    modalImg.src = carouselImages[index].src;
  };

  // Eventos para flechas dentro del modal
  nextModal.addEventListener('click', (e) => {
    e.stopPropagation();  
    showNextInModal();
  });
  prevModal.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevInModal();
  });
})();
