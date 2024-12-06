document.addEventListener('DOMContentLoaded', () => {
    const topicList = document.querySelectorAll('#topic-list li');
    const topicContent = document.getElementById('topic-content');
    const energyTitle = document.getElementById('energy-title');

    // Contenedores de los gráficos
    const barChartContainer = document.getElementById('barChartContainer');
    const pieChartContainer = document.getElementById('pieChartContainer');
    const lineChartContainer = document.getElementById('lineChartContainer');

    // Inicializar los gráficos
    // Datos de las fuentes de energía renovable (en kWh, como ejemplo)
// Inicializa los gráficos (como ya lo has hecho antes)
var barChart = document.getElementById('barChart').getContext('2d');
var pieChart = document.getElementById('pieChart').getContext('2d');
var lineChart = document.getElementById('lineChart').getContext('2d');

var myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ['Wind', 'Solar', 'Hydropower'],
        datasets: [{
            label: 'Energy Production (kWh)',
            data: [100, 200, 150], // Datos iniciales
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var myPieChart = new Chart(pieChart, {
    type: 'pie',
    data: {
        labels: ['Wind', 'Solar', 'Hydropower'],
        datasets: [{
            label: 'Energy Share (%)',
            data: [40, 30, 30], // Datos iniciales
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)']
        }]
    }
});

var myLineChart = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: ['2020', '2021', '2022'],
        datasets: [{
            label: 'Installed Capacity (MW)',
            data: [500, 600, 700], // Datos iniciales
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Función para actualizar los gráficos
document.getElementById('energyForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío del formulario

    var totalConsumption = parseFloat(document.getElementById('totalConsumption').value);
    
    // Aquí calculamos la capacidad renovable total (ejemplo de cálculo)
    var totalRenewableCapacity = 2000; // Esta cifra debe calcularse en base a tus datos
    var renewablePercentage = (totalRenewableCapacity / totalConsumption) * 100;
    
    // Actualizamos el gráfico de barras con los nuevos datos
    myBarChart.data.datasets[0].data = [renewablePercentage, 100 - renewablePercentage, 50]; // Ejemplo de nuevo valor
    myBarChart.update();

    // Actualizamos el gráfico de torta con los nuevos datos
    myPieChart.data.datasets[0].data = [renewablePercentage, 100 - renewablePercentage, 25]; // Ejemplo de nuevo valor
    myPieChart.update();

    // Actualizamos el gráfico de líneas con los nuevos datos
    myLineChart.data.datasets[0].data = [renewablePercentage, renewablePercentage + 50, renewablePercentage + 100]; // Ejemplo de nuevo valor
    myLineChart.update();

    // Mostrar el porcentaje calculado
    document.getElementById('renewablePercentage').textContent = renewablePercentage.toFixed(2) + '%';
});


    // Ocultar todos los gráficos inicialmente
    barChartContainer.style.display = 'none';
    pieChartContainer.style.display = 'none';
    lineChartContainer.style.display = 'none';

    // Actualizar contenido y mostrar el gráfico correspondiente
    topicList.forEach((item) => {
        item.addEventListener('click', () => {
            const topic = item.dataset.topic;

            // Cambiar el título
            energyTitle.textContent = `${topic.charAt(0).toUpperCase() + topic.slice(1)} Energy`;

            // Cambiar el contenido y mostrar el gráfico correspondiente
            switch (topic) {
                case 'solar':
                    topicContent.innerHTML = `
                        <h2>Solar Energy</h2>
                        <p>Solar energy is a renewable source of energy that harnesses sunlight. Solar power is energy from the sun that is converted into thermal or electrical energy. Solar energy is the cleanest and most abundant renewable energy source available, and the U.S. has some of the richest solar resources in the world. Solar technologies can harness this energy for a variety of uses, including generating electricity, providing light or a comfortable interior environment, and heating water for domestic, commercial, or industrial use.</p>
                        <img src="imagenes/solar2.jpeg" alt="Solar Energy"  class="energy-image" />
                    `;
                    updateCharts('solar');
                    break;
                case 'wind':
                    topicContent.innerHTML = `
                        <h2>Wind Energy</h2>
                        <p>Wind is used to produce electricity by converting the kinetic energy of air in motion into electricity. In modern wind turbines, wind rotates the rotor blades, which convert kinetic energy into rotational energy. This rotational energy is transferred by a shaft which to the generator, thereby producing electrical energy.</p>
                        <img src="imagenes/eolica1.jpeg" alt="Wind Energy"  class="energy-image" />
                    `;
                    updateCharts('wind');
                    break;
                case 'hydro':
                    topicContent.innerHTML = `
                        <h2>Hydroelectric Energy</h2>
                        <p>Hydroelectric energy is a renewable energy source that uses the kinetic energy of flowing water to generate electricity. Hydropower plants use dams or diversion structures to alter the natural flow of water, which is then forced through a hydraulic circuit and into a turbine. The turbine converts the kinetic energy into mechanical energy, which spins a generator to produce electricity.</p>
                        <img src="imagenes/represa.jpeg" alt="Hydroelectric Energy" class="energy-image" />
                    `;
                    updateCharts('hydro');
                    break;
                default:
                    topicContent.innerHTML = '<p>Select a topic from the list to see details here.</p>';
                    break;
            }
        });
    });

    // Función para actualizar los gráficos y mostrar solo el relevante
    function updateCharts(energyType) {
        // Ocultar todos los gráficos
        barChartContainer.style.display = 'none';
        pieChartContainer.style.display = 'none';
        lineChartContainer.style.display = 'none';

        // Mostrar solo el gráfico correspondiente
        switch (energyType) {
            case 'solar':
                barChartContainer.style.display = 'block'; // Mostrar gráfico de barras
                break;
            case 'wind':
                pieChartContainer.style.display = 'block'; // Mostrar gráfico de torta
                break;
            case 'hydro':
                lineChartContainer.style.display = 'block'; // Mostrar gráfico de línea
                break;
            default:
                break;
        }
    }
});







// Función para mostrar el contenido dinámicamente del boton contacts us
function displayDynamicContent(title, text) {
    document.getElementById('dynamic-title').textContent = title;
    document.getElementById('dynamic-text').innerHTML = text; // Usar innerHTML para interpretar HTML
    document.getElementById('dynamic-content').classList.remove('hidden');
}

// Función para abrir/cerrar el formulario de contacto
document.getElementById('contact-toggle').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('contact-modal').style.display = 'flex';
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('contact-modal').style.display = 'none';
});



// Función para manejar el envío del formulario y almacenar los datos temporalmente
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const howDidYouHear = document.getElementById('how-did-you-hear').value;
    const message = document.getElementById('message').value;

    // Crear un objeto con los datos
    const contactData = {
        name,
        phone,
        email,
        howDidYouHear,
        message
    };

    // Guardar los datos temporalmente en LocalStorage
    localStorage.setItem('contactData', JSON.stringify(contactData));

    // Mostrar mensaje de confirmación
    alert('Your data has been sent successfully!');

    // Limpiar el formulario
    document.getElementById('contact-form').reset();

    // Cerrar el formulario
    document.getElementById('contact-modal').style.display = 'none';
});


// Mostrar formulario para calcular las diferentes energías
// Mostrar el formulario y el fondo oscuro cuando se hace clic en "CASE STUDIES"
// Seleccionar elementos necesarios


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



// En esta opción se muestra el acrrusel
document.addEventListener("DOMContentLoaded", () => {
    // Botón para mostrar el carrusel
    const startLessonButton = document.querySelector(".footer-button");
    const carouselContainer = document.getElementById("carousel-container");

    startLessonButton.addEventListener("click", () => {
        carouselContainer.style.display = "block";
    });


    // Botón para cerrar el carrusel
    const closeCarouselButton = document.getElementById("close-carousel");
    closeCarouselButton.addEventListener("click", () => {
        carouselContainer.style.display = "none";
    });

    // Funcionalidad del carrusel
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    let currentIndex = 0;

    nextButton.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
});


