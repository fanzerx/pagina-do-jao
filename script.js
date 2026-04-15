document.addEventListener("DOMContentLoaded", function () {
  // REVEAL
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;

    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add("show");
      }
    });
  }

  if (reveals.length > 0) {
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }

  // TILT
  const tiltCards = document.querySelectorAll(".tilt-card");

  if (tiltCards.length > 0) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;

        card.style.transform =
          "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  // MODAL
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.getElementById("closeModal");
  const modalOverlay = document.querySelector(".custom-modal-overlay");
  const cards = document.querySelectorAll(".card-modal");

  function closeModalFn() {
    if (modal) {
      modal.classList.remove("show");
    }
    document.body.classList.remove("modal-open");
  }

  if (
    modal &&
    modalImg &&
    modalTitle &&
    modalDescription &&
    cards.length > 0
  ) {
    cards.forEach((card) => {
      card.addEventListener("click", function () {
        const title = card.getAttribute("data-title");
        const text = card.getAttribute("data-text");
        const image = card.getAttribute("data-image");

        if (!title || !image) return;

        modalTitle.textContent = title;
        modalDescription.textContent = text || "";
        modalImg.src = image;
        modalImg.alt = title;

        modal.classList.add("show");
        document.body.classList.add("modal-open");
      });
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeModalFn);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModalFn);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("show")) {
      closeModalFn();
    }
  });

  // BACK TO TOP
  const backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop();

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // MENU ATIVO
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".menu a");

  function activeMenuOnScroll() {
    if (!sections.length || !navLinks.length) return;

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activeMenuOnScroll);
  activeMenuOnScroll();
});

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");
const modalOverlay = document.querySelector(".custom-modal-overlay");

const cards = document.querySelectorAll(".card-modal");

function closeModalFn() {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;

    const title = card.getAttribute("data-title");
    const text = card.getAttribute("data-text");
    const image = card.getAttribute("data-image");

    modalTitle.textContent = title;
    modalDescription.textContent = text;
    modalImg.src = image;
    modalImg.alt = title;

    modal.classList.add("show");
    document.body.classList.add("modal-open");
  });
});

if (closeModal) {
  closeModal.addEventListener("click", closeModalFn);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", closeModalFn);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeModalFn();
  }
});


const images = document.querySelectorAll(".hero-bg img");
let index = 0;

setInterval(() => {
  images[index].classList.remove("active");
  index = (index + 1) % images.length;
  images[index].classList.add("active");
}, 4000);

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".hero-bg img");
  const dots = document.querySelectorAll(".dot");

  let index = 0;

  function showSlide(i) {
    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    images[i].classList.add("active");
    dots[i].classList.add("active");

    index = i;
  }

  // clique nas bolinhas
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(parseInt(dot.dataset.index));
    });
  });

  // troca automática
  setInterval(() => {
    let next = (index + 1) % images.length;
    showSlide(next);
  }, 4000);
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".hero-bg img");
  const dots = document.querySelectorAll(".dot");
  const prev = document.querySelector(".arrow.left");
  const next = document.querySelector(".arrow.right");

  let index = 0;

  function showSlide(i) {
    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    images[i].classList.add("active");
    dots[i].classList.add("active");

    index = i;
  }

  // bolinhas
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(parseInt(dot.dataset.index));
    });
  });

  // setinha direita →
  next.addEventListener("click", () => {
    let newIndex = (index + 1) % images.length;
    showSlide(newIndex);
  });

  // setinha esquerda ←
  prev.addEventListener("click", () => {
    let newIndex = (index - 1 + images.length) % images.length;
    showSlide(newIndex);
  });

  // autoplay
  setInterval(() => {
    let nextIndex = (index + 1) % images.length;
    showSlide(nextIndex);
  }, 4000);
});

let intervalTime = window.innerWidth < 768 ? 6000 : 4000;

setInterval(() => {
  let nextIndex = (index + 1) % images.length;
  showSlide(nextIndex);
}, intervalTime);
