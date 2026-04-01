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