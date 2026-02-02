const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".main-nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    hamburger.classList.toggle("active");
});
