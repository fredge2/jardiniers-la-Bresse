// Navigation mobile
function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

// Gérer les interactions du menu
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.querySelector(".nav-menu");

  // Fermer le menu mobile quand on clique sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener("click", function (event) {
    const navbar = document.querySelector(".navbar");
    if (!navbar.contains(event.target)) {
      navMenu.classList.remove("active");
    }
  });

  // Animation au scroll (apparition en douceur des éléments)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observer les cartes pour l'animation
  const cards = document.querySelectorAll(".card, .bienvenue-adherents");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(card);
  });

  // Optionnel : Lancer l'effet de particules sur la page d'accueil si souhaité
  createFloatingParticles();
});

// Gérer le lien actif de la navigation en fonction de l'URL
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (
      link.getAttribute("href") === currentPage ||
      (currentPage === "" && link.getAttribute("href") === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}

// Fonction pour créer des particules flottantes (effet décoratif sur les images de fond)
function createFloatingParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";

    hero.appendChild(particle);
  }
}

// Ajout des styles pour l'animation des particules
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
    }
`;
document.head.appendChild(style);
