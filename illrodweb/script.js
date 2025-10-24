// === NAVEGACIÓN SUAVE ===
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// === GALERÍA (DINÁMICA + FILTROS + LIGHTBOX) ===

const galleryGrid = document.querySelector('#galeria .gallery-grid');
galleryData.forEach(item => {
  const div = document.createElement('div');
  div.classList.add('gallery-item');
  div.setAttribute('data-category', item.category);
  div.innerHTML = `<img src="${item.src}" alt="${item.category}">`;
  galleryGrid.appendChild(div);
});

// === FILTROS ===
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");

    document.querySelectorAll(".gallery-item").forEach(item => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        item.style.display = "block";
        setTimeout(() => item.style.opacity = "1", 100);
      } else {
        item.style.opacity = "0";
        setTimeout(() => item.style.display = "none", 300);
      }
    });
  });
});

// === LIGHTBOX GALERÍA ===
const modal = document.getElementById('modal');
let currentIndex = 0;

galleryGrid.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    const allImgs = Array.from(document.querySelectorAll('.gallery-item img'));
    currentIndex = allImgs.indexOf(e.target);
    openModal(currentIndex, allImgs);
  }
});

function openModal(index, list) {
  modal.style.display = 'flex';
  modal.innerHTML = `
    <span id="close">&times;</span>
    <img src="${list[index].src}">
    <div id="modal-nav">
      <button id="prev">&lt;</button>
      <button id="next">&gt;</button>
    </div>
  `;

  document.getElementById('close').onclick = () => modal.style.display = 'none';
  document.getElementById('prev').onclick = () => navigate(-1, list);
  document.getElementById('next').onclick = () => navigate(1, list);
}

function navigate(dir, list) {
  currentIndex = (currentIndex + dir + list.length) % list.length;
  modal.querySelector('img').src = list[currentIndex].src;
}

// === EVENTOS ===
const events = [
  { title: "Show en Palermo Club", date: "2025-11-05", location: "Buenos Aires", soldOut: false },
  { title: "Festival Urbano", date: "2025-12-12", location: "Córdoba", soldOut: true },
  { title: "Tour Sur", date: "2026-01-20", location: "Mar del Plata", soldOut: false }
];

const eventsContainer = document.querySelector('#eventos .content');
events.forEach(e => {
  const div = document.createElement('div');
  div.classList.add('event-card');
  div.innerHTML = `
    <h3>${e.title}</h3>
    <p>${e.date} - ${e.location}</p>
    <span class="${e.soldOut ? 'soldout' : 'available'}">
      ${e.soldOut ? 'Sold Out' : 'Entradas disponibles'}
    </span>
  `;
  eventsContainer.appendChild(div);
});

// === EFECTO NEÓN EN EVENTOS ===
const eventCards = document.querySelectorAll(".event-card");
eventCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});
// === EFECTOS VISUALES Y TRANSICIONES ===

// Fade-in progresivo para elementos visibles al hacer scroll
const fadeElements = document.querySelectorAll('.music-card, .event-card, #galeria img, iframe');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
});

window.addEventListener('scroll', () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Hover animado en la galería
document.querySelectorAll('#galeria img').forEach(img => {
    img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.boxShadow = '0 0 15px rgba(255,255,255,0.3)';
    });
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = 'none';
    });
});

// Hover con elevación y glow en tarjetas de eventos
document.querySelectorAll('.event-card').forEach(card => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 0 20px rgba(255, 0, 150, 0.3)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Parpadeo neón en textos de estado (Sold Out / Entradas disponibles)
document.querySelectorAll('.event-card span').forEach(span => {
    if (span.classList.contains('soldout')) {
        span.style.color = '#ff0080';
        span.style.textShadow = '0 0 10px #ff0080';
        span.style.animation = 'neonPulse 1.5s infinite alternate';
    } else if (span.classList.contains('available')) {
        span.style.color = '#00ffb3';
        span.style.textShadow = '0 0 10px #00ffb3';
        span.style.animation = 'neonPulse 2s infinite alternate';
    }
});

// Creamos la animación vía JS (si no está en CSS)
const style = document.createElement('style');
style.textContent = `
@keyframes neonPulse {
  from { opacity: 0.6; text-shadow: 0 0 5px currentColor; }
  to { opacity: 1; text-shadow: 0 0 15px currentColor, 0 0 30px currentColor; }
}
`;
document.head.appendChild(style);
