const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

// Botón siguiente
nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
});

// Botón anterior
prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Carrusel automático
setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
}, 3000);
