//PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => preloader.classList.add("hidden"), 350);
  }
});

//TYPEWRITER
const frases = [
  "D' AVILLAS FEST",
  "UM ESPAÇO PENSADO PARA VOCÊ",
  "AGENDE AGORA",
];

const elemento = document.getElementById("typing");

let fraseIndex = 0;
let charIndex = 0;
let apagando = false;

function typeEffect() {
  const fraseAtual = frases[fraseIndex];

  if (!apagando) {
    elemento.textContent = fraseAtual.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === fraseAtual.length) {
      apagando = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    elemento.textContent = fraseAtual.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      apagando = false;
      fraseIndex = (fraseIndex + 1) % frases.length;
    }
  }

  setTimeout(typeEffect, apagando ? 50 : 100);
}

typeEffect();

//CARROSSEL
const carouselTrack = document.querySelector(".carousel-track");
const carouselContainer = document.querySelector(".carousel-container");
let images = [...document.querySelectorAll(".carousel-image")];

images.forEach((img) => {
  const clone = img.cloneNode(true);
  clone.classList.add("clone");
  carouselTrack.insertBefore(clone, carouselTrack.firstChild);
});

images = [...carouselTrack.querySelectorAll(".carousel-image")];

function waitImagesLoaded(imgEls) {
  return Promise.all(
    imgEls.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((res) => {
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });
      });
    }),
  );
}

const allImgs = [...carouselTrack.querySelectorAll(".carousel-image")];

waitImagesLoaded(allImgs).then(() => {
  carouselTrack.style.animationPlayState = "running";
});

const modalOverlay = document.querySelector(".modal-overlay");
const modalImage = document.querySelector(".modal-image");
const closeButton = document.querySelector(".close-button");

let isZoomed = false;

function pauseCarousel() {
  carouselTrack.style.animationPlayState = "paused";
}

function playCarousel() {
  if (!isZoomed) carouselTrack.style.animationPlayState = "running";
}

carouselContainer.addEventListener("mouseenter", pauseCarousel);
carouselContainer.addEventListener("mouseleave", playCarousel);

function fitModalImage() {
  const natW = modalImage.naturalWidth;
  const natH = modalImage.naturalHeight;
  if (!natW || !natH) return;

  const maxW = window.innerWidth * 0.9;
  const maxH = window.innerHeight * 0.85;

  // Escala a imagem para preencher o máximo de espaço possível
  // (permitindo ampliar imagens pequenas), mantendo a proporção.
  const scale = Math.min(maxW / natW, maxH / natH);

  modalImage.style.width = `${natW * scale}px`;
  modalImage.style.height = `${natH * scale}px`;
}

function openModal(src) {
  pauseCarousel();
  isZoomed = true;

  // Limpa o tamanho anterior para não "herdar" as dimensões da imagem passada.
  modalImage.style.width = "";
  modalImage.style.height = "";
  modalImage.src = src;

  if (modalImage.complete && modalImage.naturalWidth) {
    fitModalImage();
  }

  modalOverlay.style.display = "flex";
  modalOverlay.offsetHeight;
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

modalImage.addEventListener("load", fitModalImage);
window.addEventListener("resize", () => {
  if (modalOverlay.classList.contains("active")) fitModalImage();
});

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    modalOverlay.style.display = "none";
    modalImage.src = "";
    isZoomed = false;
    playCarousel();
  }, 400);
}

images.forEach((img) => {
  img.addEventListener("click", () => openModal(img.src));
});

closeButton.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

const REVIEWS = [
  {
    nome: "Maria Silva",
    texto: "Salão maravilhoso, atendimento excelente!",
    estrelas: 5,
  },
  {
    nome: "João Pereira",
    texto: "Fizemos o aniversário da minha filha lá, adorei tudo.",
    estrelas: 5,
  },
    {
    nome: "Maria Silva",
    texto: "Salão maravilhoso, atendimento excelente!",
    estrelas: 5,
  },
  {
    nome: "João Pereira",
    texto: "Fizemos o aniversário da minha filha lá, adorei tudo.",
    estrelas: 5,
  },
    {
    nome: "Maria Silva",
    texto: "Salão maravilhoso, atendimento excelente!",
    estrelas: 5,
  },
  {
    nome: "João Pereira",
    texto: "Fizemos o aniversário da minha filha lá, adorei tudo.",
    estrelas: 5,
  },
    {
    nome: "Maria Silva",
    texto: "Salão maravilhoso, atendimento excelente!",
    estrelas: 5,
  },
  {
    nome: "João Pereira",
    texto: "Fizemos o aniversário da minha filha lá, adorei tudo.",
    estrelas: 5,
  },
    {
    nome: "Maria Silva",
    texto: "Salão maravilhoso, atendimento excelente!",
    estrelas: 5,
  },
  {
    nome: "João Pereira",
    texto: "Fizemos o aniversário da minha filha lá, adorei tudo.",
    estrelas: 5,
  },
];

let paginaAtualReviews = 1;
const reviewsPorPagina = 8;

function renderizarAvaliacoes() {
  const grid = document.getElementById("reviewsGrid");
  const totalSpan = document.getElementById("currentPage");
  const emptyMsg = document.getElementById("reviewsEmpty");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  if (!grid) return;

  emptyMsg.hidden = REVIEWS.length !== 0;

  const totalPaginas = Math.ceil(REVIEWS.length / reviewsPorPagina);
  paginaAtualReviews = Math.min(paginaAtualReviews, totalPaginas || 1);

  const inicio = (paginaAtualReviews - 1) * reviewsPorPagina;
  const fim = inicio + reviewsPorPagina;
  const avaliacoesPagina = REVIEWS.slice(inicio, fim);

  grid.innerHTML = "";
  grid.className = "reviews-grid";

  if (avaliacoesPagina.length === 1) grid.classList.add("grid-1");
  if (avaliacoesPagina.length === 2) grid.classList.add("grid-2");
  if (avaliacoesPagina.length === 3) grid.classList.add("grid-3");

  avaliacoesPagina.forEach((av, i) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.style.animationDelay = `${i * 0.08}s`;

    const nomeEl = document.createElement("div");
    nomeEl.className = "review-name";
    nomeEl.textContent = av.nome;

    const starsEl = document.createElement("div");
    starsEl.className = "review-stars";
    starsEl.textContent =
      "⭐".repeat(av.estrelas) + "☆".repeat(5 - av.estrelas);

    const textoEl = document.createElement("div");
    textoEl.className = "review-text";
    textoEl.textContent = av.texto;

    const header = document.createElement("div");
    header.className = "review-header";
    const avatar = document.createElement("div");
    avatar.className = "review-avatar";
    header.appendChild(avatar);
    header.appendChild(nomeEl);

    card.appendChild(header);
    card.appendChild(starsEl);
    card.appendChild(textoEl);

    grid.appendChild(card);
  });

  totalSpan.textContent = paginaAtualReviews;
  prevBtn.disabled = paginaAtualReviews === 1;
  nextBtn.disabled = paginaAtualReviews === totalPaginas || totalPaginas === 0;
}

document.getElementById("prevPage")?.addEventListener("click", () => {
  if (paginaAtualReviews > 1) {
    paginaAtualReviews--;
    renderizarAvaliacoes();
    scrollParaAvaliacoes();
  }
});

document.getElementById("nextPage")?.addEventListener("click", () => {
  paginaAtualReviews++;
  renderizarAvaliacoes();
  scrollParaAvaliacoes();
});

function scrollParaAvaliacoes() {
  const secao = document.getElementById("avaliacoes");
  if (!secao) return;

  const header = document.getElementById("siteHeader");
  const headerHeight = header ? header.offsetHeight : 0;

  const topoSecao =
    secao.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

  window.scrollTo({
    top: topoSecao,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", renderizarAvaliacoes);

const imagensGaleria = document.querySelectorAll(".galeria-img");

imagensGaleria.forEach((img) => {
  img.addEventListener("click", () => {
    openModal(img.src);
  });
});

document.querySelectorAll(".footer-link").forEach((link) => {
  link.addEventListener("click", () => {
    link.setAttribute("target", "_blank");
  });
});

//HEADER DINÂMICO (encolhe ao rolar)
const siteHeader = document.getElementById("siteHeader");

// Usamos dois limites diferentes (histerese) em vez de um só.
// Como o header muda de altura, um único limite faz o scroll oscilar
// bem na fronteira (o header encolhe -> empurra o conteúdo pra cima ->
// o scroll volta abaixo do limite -> o header cresce de novo -> repete
// infinitamente, causando a "tremida"). Com uma folga entre os dois
// valores, essa oscilação não acontece mais.
const HEADER_SHRINK_AT = 90;
const HEADER_EXPAND_AT = 30;

function updateHeaderOnScroll() {
  const y = window.scrollY;

  if (y > HEADER_SHRINK_AT) {
    siteHeader.classList.add("scrolled");
  } else if (y < HEADER_EXPAND_AT) {
    siteHeader.classList.remove("scrolled");
  }
  // entre 30 e 90px o estado atual é mantido, sem alternar.
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

//BOTÃO VOLTAR AO TOPO
const backToTopBtn = document.getElementById("backToTop");

function updateBackToTop() {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//ANIMAÇÕES DE REVELAÇÃO AO ROLAR
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
);

revealElements.forEach((el) => revealObserver.observe(el));