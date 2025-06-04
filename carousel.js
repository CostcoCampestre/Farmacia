(() => {
  /* ---------- Elementos ---------- */
  const carousel     = document.getElementById('carousel');
  const images       = carousel.querySelectorAll('img');
  const dotsWrap     = document.getElementById('indicators');
  const prevBtn      = document.getElementById('prevBtn');
  const nextBtn      = document.getElementById('nextBtn');
  const modal        = document.getElementById('imageModal');
  const modalImg     = document.getElementById('modalImage');
  const closeBtn     = modal.querySelector('.modal-close');
  const prevModalBtn = modal.querySelector('.modal-prev');
  const nextModalBtn = modal.querySelector('.modal-next');
  const total        = images.length;
  let index = 0;
  let timer = null;

  /* ---------- Helpers ---------- */
  const startAuto  = () => { timer = setInterval(() => show(index + 1), 5000); };
  const stopAuto   = () => { clearInterval(timer); };
  const show       = i => {
    index = (i + total) % total;
    images.forEach((img,k)=>img.classList.toggle('active',k===index));
    dotsWrap.querySelectorAll('.indicator')
            .forEach((d,k)=>d.classList.toggle('active',k===index));
  };

  /* ---------- Dots dinámicos ---------- */
  images.forEach((_,i)=>{
    const dot = document.createElement('div');
    dot.className = 'indicator' + (i ? '' : ' active');
    dot.dataset.i = i;
    dot.addEventListener('click',()=>show(+dot.dataset.i));
    dotsWrap.appendChild(dot);
  });

  /* ---------- Navegación carrusel ---------- */
  prevBtn.addEventListener('click',()=>show(index-1));
  nextBtn.addEventListener('click',()=>show(index+1));
  if (total <= 1) { prevBtn.style.display = nextBtn.style.display = 'none'; }

  /* ---------- Modal ---------- */
  images.forEach((img,i)=>{
    img.addEventListener('click',()=>{
      stopAuto();
      modalImg.src = img.src;
      modal.style.display = 'flex';
      index = i;
      toggleModalArrows();
    });
  });
  const toggleModalArrows = ()=> {
    const disp = total>1 ? 'block':'none';
    prevModalBtn.style.display = nextModalBtn.style.display = disp;
  };

  prevModalBtn.addEventListener('click',e=>{
    e.stopPropagation(); show(index-1); modalImg.src = images[index].src;
  });
  nextModalBtn.addEventListener('click',e=>{
    e.stopPropagation(); show(index+1); modalImg.src = images[index].src;
  });
  closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{ if (e.target === modal) closeModal(); });
  window.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

  function closeModal(){
    modal.style.display='none';
    startAuto();
  }

  /* ---------- Inicio ---------- */
  show(0);
  if(total>1) startAuto();
})();
