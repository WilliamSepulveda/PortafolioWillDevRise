const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Initial canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let particleCount = calculateParticleCount();

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
            this.fadingOut = true;
        }
        
        if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
                this.reset();
            }
        }
    }

    draw() {
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255/2)}, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

function calculateParticleCount() {
    return Math.floor((canvas.width * canvas.height) / 6000);
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleCount = calculateParticleCount();
    initParticles();
}

window.addEventListener('resize', onResize);

initParticles();
animate();



// parte de valores 
const secciones = document.querySelectorAll('.content-section');
let indiceActual = 0;

// Mostrar la sección inicial
secciones[indiceActual].style.display = 'block';
secciones[indiceActual].classList.add('active');

// Asignar eventos a todos los botones de navegación
secciones.forEach((seccion, index) => {
    seccion.querySelector('.prev').addEventListener('click', () => {
        cambiarSeccion(-1);
    });

    seccion.querySelector('.next').addEventListener('click', () => {
        cambiarSeccion(1);
    });
});

function cambiarSeccion(direccion) {
    secciones[indiceActual].classList.remove('active'); // Quitar clase de activo
    secciones[indiceActual].classList.add('exit'); // Aplicar clase de salida

    setTimeout(() => {
        secciones[indiceActual].style.display = 'none'; // Ocultar la sección actual
        indiceActual = (indiceActual + direccion + secciones.length) % secciones.length; // Calcular el nuevo índice
        secciones[indiceActual].style.display = 'block'; // Mostrar la nueva sección
        secciones[indiceActual].classList.remove('exit'); // Quitar clase de salida
        secciones[indiceActual].classList.add('active'); // Aplicar clase de activo
    }, 600); // Tiempo de espera para la animación de salida
}

// mouse

const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});

// scroll de certificados 
const containerCertificado = document.querySelector('.containerCertificado');

let reachedEndOfScroll = false;
let scrollSpeed = 50; // Ajusta la velocidad de desplazamiento horizontal

function handleScroll(event) {
    if (!reachedEndOfScroll) {
        event.preventDefault(); // Evita el scroll vertical

        // Ajuste para un desplazamiento horizontal más rápido
        containerCertificado.scrollLeft += event.deltaY * scrollSpeed / 20; 

        // Verificar si hemos llegado al final o al inicio del scroll horizontal
        const atEnd = containerCertificado.scrollLeft + containerCertificado.clientWidth >= containerCertificado.scrollWidth;
        const atStart = containerCertificado.scrollLeft <= 0;
        
        // Permitir desplazamiento vertical cuando llegamos al final
        if (atEnd || atStart) {
            reachedEndOfScroll = true;
        }
    } else if (event.deltaY < 0 || event.deltaY > 0) {
        // Restablecer el scroll horizontal cuando se vuelve a desplazar en el contenedor
        reachedEndOfScroll = false;
    }
}

// Añadir el control de desplazamiento horizontal a eventos `wheel` y `touchmove`
containerCertificado.addEventListener('wheel', handleScroll);
containerCertificado.addEventListener('touchmove', (event) => {
    if (!reachedEndOfScroll) {
        handleScroll(event);
    }
});

// animacion al bajar a objetivos
document.addEventListener("DOMContentLoaded", () => {
    const objetivosSection = document.querySelector('.contentSsectionObjetivos');

    function handleScroll() {
        const sectionPosition = objetivosSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1;

        // Comprueba si la sección está visible en la pantalla
        if (sectionPosition < screenPosition && sectionPosition > 0) {
            objetivosSection.classList.add('active');
        } else {
            objetivosSection.classList.remove('active');
        }
    }

    window.addEventListener('scroll', handleScroll);
});

