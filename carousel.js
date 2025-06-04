(function () {
  const carouselImages = document.querySelectorAll('#carousel img');
  const dots           = document.querySelectorAll('.indicator');
  const prevBtn        = document.getElementById('prevBtn');
  const nextBtn        = document.getElementById('nextBtn');
  const total          = carouselImages.length;
  let index = 0;

  const showImage = (i) => {
    // Ciclar índices
    if (i < 0) i = total - 1;
    if (i >= total) i = 0;
    // Ocultar todas, remover clase .active
    carouselImages.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    // Mostrar la imagen i
    carouselImages[i].classList.add('active');
    dots[i].classList.add('active');
    index = i;
  };

  prevBtn.onclick = () => showImage(index - 1);
  nextBtn.onclick = () => showImage(index + 1);
  dots.forEach(d => d.onclick = () => showImage(+d.dataset.index));

  setInterval(() => showImage(index + 1), 5000); // auto-avance cada 5s
})();
