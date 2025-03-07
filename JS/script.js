// Navegación Responsiva
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Filtro de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón seleccionado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Aquí iría la lógica para enviar los datos (AJAX, fetch, etc.)
            console.log('Datos del formulario:', formValues);
            
            // Simulación de envío exitoso
            alert('Mensaje enviado con éxito. Te contactaremos pronto.');
            this.reset();
        });
    }
    
    // Efecto de reveal para el texto del hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('reveal');
        }, 300);
    }
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambio de estilo de navegación al hacer scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    // Este código debe agregarse dentro del evento DOMContentLoaded en tu script.js existente

// Añadir la nueva sección al observador de intersección
const clientsSection = document.querySelector('#aliados');
if (clientsSection) {
    observer.observe(clientsSection);
}

// Animación para los elementos de cliente al hacer hover
const clientItems = document.querySelectorAll('.client-item');
clientItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 102, 204, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
});

// Animación de entrada para los clientes (opcional, para efectos más avanzados)
function animateClientsEntry() {
    const clientItems = document.querySelectorAll('.client-item');
    clientItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 150 * index); // Retraso escalonado para cada elemento
    });
}

// Detectar cuándo la sección de clientes está visible
const clientsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateClientsEntry();
            clientsObserver.unobserve(entry.target); // Solo animar una vez
        }
    });
}, { threshold: 0.2 });

if (clientsSection) {
    clientsObserver.observe(clientsSection);
}

// Añadir la sección al menú de navegación (si no existe ya)
function addClientsSectionToMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const menuItems = navMenu.querySelectorAll('li a');
        let alreadyExists = false;
        
        menuItems.forEach(item => {
            if (item.getAttribute('href') === '#aliados') {
                alreadyExists = true;
            }
        });
        
        if (!alreadyExists) {
            const contactMenuItem = navMenu.querySelector('li a[href="#contacto"]');
            if (contactMenuItem) {
                const contactLi = contactMenuItem.parentElement;
                const newLi = document.createElement('li');
                newLi.innerHTML = '<a href="#aliados">Aliados</a>';
                navMenu.insertBefore(newLi, contactLi);
            } else {
                const newLi = document.createElement('li');
                newLi.innerHTML = '<a href="#aliados">Aliados</a>';
                navMenu.appendChild(newLi);
            }
        }
    }
}

addClientsSectionToMenu();
});

// Agregar CSS adicional para animaciones
const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 1;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .hero-content.reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    nav.scrolled {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        padding: 15px 0;
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);