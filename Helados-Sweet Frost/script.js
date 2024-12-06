var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick= () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");

}
window.onscroll= () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
}


document.querySelectorAll('.bx-heart').forEach(heart => {
  heart.addEventListener('click', () => {
      heart.classList.toggle('active'); // Activa o desactiva la clase active
      if (heart.classList.contains('active')) {
          heart.classList.remove('bx-heart'); // Cambia el ícono vacío
          heart.classList.add('bxs-heart');  // Cambia al ícono relleno
      } else {
          heart.classList.remove('bxs-heart'); // Vuelve al ícono vacío
          heart.classList.add('bx-heart');
      }
  });
});

document.getElementById('suggestion-form').addEventListener('submit', function (event) {
event.preventDefault();

const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const opinion = document.getElementById('opinion').value;

if (opinion.trim() === '') {
    alert('Please enter your suggestion.');
    return;
}

console.log({
    name,
    email,
    opinion
});

alert('Thank you for your suggestion! We appreciate your feedback.');

// Clear the form
this.reset();
});
// Cintenido de la Miión y Visión
// Obtén el botón de "Services" y el contenedor de la misión/visión
// Obtén el botón de "Services" y el contenedor de la misión/visión
const servicesBtn = document.querySelector('li a[href="#"]');  // Asegúrate de que el botón de "Services" sea correcto
const modo = document.getElementById('modo-mision-vision');
const closeButton = modo.querySelector('.close-button');

// Función para abrir el modo de misión y visión
servicesBtn.addEventListener('click', () => {
  modo.classList.remove('hidden');  // Muestra el modo
});

// Función para cerrar el modo de misión y visión
closeButton.addEventListener('click', () => {
  modo.classList.add('hidden');  // Oculta el modo
});

// También puedes hacer que el modo se cierre si haces clic fuera de él
modo.addEventListener('click', (e) => {
  if (e.target === modo) {
      modo.classList.add('hidden');  // Oculta el modo al hacer clic fuera del contenido
  }
});
