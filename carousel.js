(function () {
  // Capturamos todos los elementos necesarios
  const carouselContainer = document.getElementById('carousel');
  const carouselImages    = carouselContainer.querySelectorAll('img');
  const indicatorsWrapper = document.getElementById('indicators');
  const prevBtn           = document.getElementById('prevBtn');
  const nextBtn           = document.getElementById('nextBtn');
  const totalImages       = carouselImages.length;
  let index = 0;

  // 1) Crear dinámicamente los indicadores (dots) según la cantidad de imágenes
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

  // 2) Función para mostrar la imagen que corresponda y actualizar clases
  const showImage = (i) => {
    // Ciclar índices
    if (i < 0) i = totalImages - 1;
    if (i >= totalImages) i = 0;

    // Ocultar todas las imágenes y desactivar todos los dots
    carouselImages.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    // Mostrar la imagen seleccionada y activar su dot correspondiente
    carouselImages[i].classList.add('active');
    dots[i].classList.add('active');
    index = i;
  };

  // 3) Eventos para botones anterior y siguiente
  prevBtn.addEventListener('click', () => showImage(index - 1));
  nextBtn.addEventListener('click', () => showImage(index + 1));

  // 4) Evento para cada indicador (dot) recién creado
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const i = parseInt(dot.getAttribute('data-index'), 10);
      showImage(i);
    });
  });

  // 5) Auto‐avance cada 5 segundos
  setInterval(() => showImage(index + 1), 5000);
})();
