// ============================================
// CONFIGURACIÓN DEL CARRUSEL
// ============================================

class ElegantCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.slides = Array.from(this.track.children);
        this.nextButton = document.getElementById('nextBtn');
        this.prevButton = document.getElementById('prevBtn');
        this.indicatorsContainer = document.getElementById('carouselIndicators');
        this.thumbnailsContainer = document.getElementById('carouselThumbnails');
        this.currentIndex = 0;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        if (!this.track) return;
        
        // Crear indicadores
        this.createIndicators();
        
        // Crear miniaturas
        this.createThumbnails();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Auto-play (opcional)
        this.startAutoPlay();
        
        // Actualizar estado inicial
        this.updateCarousel();
    }
    
    createIndicators() {
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.children);
    }
    
    createThumbnails() {
        this.slides.forEach((slide, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');
            
            const img = slide.querySelector('.carousel-image');
            if (img) {
                const thumbImg = document.createElement('img');
                thumbImg.src = img.src;
                thumbImg.alt = img.alt;
                thumbnail.appendChild(thumbImg);
            }
            
            thumbnail.addEventListener('click', () => this.goToSlide(index));
            this.thumbnailsContainer.appendChild(thumbnail);
        });
        this.thumbnails = Array.from(this.thumbnailsContainer.children);
    }
    
    setupEventListeners() {
        this.nextButton?.addEventListener('click', () => this.nextSlide());
        this.prevButton?.addEventListener('click', () => this.prevSlide());
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.isAnimating = true;
        this.currentIndex = index;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    updateCarousel() {
        // Mover el track
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Actualizar clases activas
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentIndex);
        });
        
        // Actualizar botones
        this.updateButtons();
    }
    
    updateButtons() {
        // Opcional: deshabilitar botones en los extremos
        // this.prevButton.disabled = this.currentIndex === 0;
        // this.nextButton.disabled = this.currentIndex === this.slides.length - 1;
    }
    
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
        
        // Pausar auto-play cuando el usuario interactúa
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.resumeAutoPlay(interval));
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resumeAutoPlay(interval) {
        if (!this.autoPlayInterval) {
            this.startAutoPlay(interval);
        }
    }
}

// ============================================
// MENÚ ELEGANTE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const menuItems = document.getElementById('menuItems');

if (menuToggle && menuItems) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menuItems.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const links = menuItems.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            menuItems.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !menuItems.contains(e.target)) {
            menuToggle.classList.remove('active');
            menuItems.classList.remove('active');
        }
    });
}

// ============================================
// NAVEGACIÓN SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// EFECTO PARALLAX
// ============================================

const parallaxLayer = document.getElementById('parallaxLayer');

if (parallaxLayer) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        parallaxLayer.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// ============================================
// CUENTA REGRESIVA
// ============================================

function updateCountdown() {
    const eventDate = new Date('2026-03-08T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const messageEl = document.getElementById('countdownMsg');
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    } else {
        if (messageEl) {
            messageEl.innerHTML = '¡Hoy es mi Primera Comunión! 🎉';
            messageEl.style.fontSize = '20px';
            messageEl.style.fontWeight = '700';
            messageEl.style.color = 'var(--gold)';
        }
        if (daysEl) daysEl.textContent = '0';
        if (hoursEl) hoursEl.textContent = '0';
        if (minutesEl) minutesEl.textContent = '0';
        if (secondsEl) secondsEl.textContent = '0';
    }
}

// ============================================
// BOTÓN AGREGAR A CALENDARIO
// ============================================

const addCalendarBtn = document.getElementById('addCalendar');
if (addCalendarBtn) {
    addCalendarBtn.addEventListener('click', () => {
        const eventTitle = 'Primera Comunión - Thomas David Álvarez Castro';
        const eventDate = '20260308';
        const startTime = '140000';
        const endTime = '160000';
        const eventDetails = 'Ceremonia de Primera Comunión en Parroquia La Purísima Concepción';
        const location = 'Parroquia La Purísima Concepción, Cl. 36 Sur #23-15, Envigado, Antioquia';
        
        const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(eventTitle)}&dates=${eventDate}T${startTime}/${eventDate}T${endTime}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(location)}`;
        
        window.open(googleCalendarUrl, '_blank');
    });
}

// ============================================
// BOTONES DE UBICACIÓN
// ============================================

const churchLocationBtn = document.getElementById('churchLocation');
if (churchLocationBtn) {
    churchLocationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const address = encodeURIComponent('Cl 51 49 44,Parque de Bello, Antioquia, Colombia');
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
        window.open(googleMapsUrl, '_blank');
    });
}

const partyLocationBtn = document.getElementById('partyLocation');
if (partyLocationBtn) {
    partyLocationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const address = encodeURIComponent('Cra 49 # 51 - 48, Copacabana, Antioquia, Colombia');
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
        window.open(googleMapsUrl, '_blank');
    });
}

// ============================================
// CONFIRMACIÓN RSVP
// ============================================

const rsvpButtons = document.querySelectorAll('.rsvp-elegant-btn');
const whatsappNumber = '+573108915192';

rsvpButtons.forEach(button => {
    button.addEventListener('click', () => {
        const response = button.dataset.response;
        let message = '';
        
        switch(response) {
            case 'SI':
                message = '¡Hola! Confirmo mi asistencia a la Primera Comunión de Thomas David Álvarez Castroel 022 deMarzo a las 2:00 PM. ¡Estaré ahí para celebrar! 🎉✞';
                break;
            case 'TALVEZ':
                message = 'Hola, en relación a la Primera Comunión de Thomas David Álvarez Castroel 022 deMarzo, aún no estoy seguro/a de poder asistir, pero les confirmaré pronto. Gracias por la invitación 🙏✞';
                break;
            case 'NO':
                message = 'Hola, lamentablemente no podré asistir a la Primera Comunión de Thomas David Álvarez Castroel 022 deMarzo, pero estaré con ustedes en espíritu en este día tan especial 💙✞';
                break;
            default:
                message = 'Hola, me gustaría confirmar sobre la asistencia a la Primera Comunión de Thomas David Álvarez Castroel 022 deMarzo a las 2:00 PM.';
        }
        
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
        
        // Efecto visual de selección
        rsvpButtons.forEach(btn => btn.style.transform = 'scale(1)');
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            window.open(whatsappUrl, '_blank');
        }, 200);
    });
});

// ============================================
// CONTROL DE MÚSICA
// ============================================

const musicBtn = document.getElementById('musicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

if (musicBtn && backgroundMusic && musicIcon) {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
        } else {
            backgroundMusic.play().catch(e => console.log('Error al reproducir audio:', e));
            musicIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        }
        isPlaying = !isPlaying;
    });
}

// Manejo de errores de audio
if (backgroundMusic) {
    backgroundMusic.addEventListener('error', (e) => {
        console.log('Error al cargar el audio:', e);
        if (musicBtn) musicBtn.style.display = 'none';
    });
}

// ============================================
// OBSERVADOR DE INTERSECCIÓN
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ============================================
// ANIMACIONES DE ENTRADA PARA BLESSING CARDS
// ============================================

function animateBlessings() {
    const blessings = document.querySelectorAll('.blessing-card');
    blessings.forEach((blessing, index) => {
        blessing.style.opacity = '0';
        blessing.style.transform = 'translateY(30px)';
        blessing.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        blessing.style.transitionDelay = `${index * 0.2}s`;
    });
    
    const blessingsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    blessings.forEach(blessing => blessingsObserver.observe(blessing));
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carrusel
    const carousel = new ElegantCarousel();
    
    // Inicializar cuenta regresiva
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Animaciones de entrada para secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Animar tarjetas de bendiciones
    animateBlessings();
    
    // Preloader elegante
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #faf7f2, #f5efe6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 20px; color: #c9a961; animation: pulse 1.5s ease-in-out infinite;">✟</div>
            <div style="font-size: 18px; color: #6b5d4f; font-family: Georgia, serif; font-style: italic;">Cargando invitación...</div>
        </div>
    `;
    
    // Añadir animación de pulso
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 800);
    });
});

// ============================================
// SMOOTH SCROLL INDICATOR
// ============================================

// Indicador de scroll suave para la primera sección
const hero = document.querySelector('.hero');
if (hero) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 50px;
        border: 2px solid var(--gold);
        border-radius: 25px;
        opacity: 0.6;
        cursor: pointer;
        transition: opacity 0.3s ease;
    `;
    
    const scrollDot = document.createElement('div');
    scrollDot.style.cssText = `
        width: 6px;
        height: 6px;
        background: var(--gold);
        border-radius: 50%;
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        animation: scrollBounce 2s ease-in-out infinite;
    `;
    
    scrollIndicator.appendChild(scrollDot);
    hero.appendChild(scrollIndicator);
    
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes scrollBounce {
            0%, 100% { top: 8px; }
            50% { top: 30px; }
        }
    `;
    document.head.appendChild(bounceStyle);
    
    scrollIndicator.addEventListener('click', () => {
        const gallery = document.getElementById('galeria');
        if (gallery) {
            gallery.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Ocultar indicador al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.6';
        }
    });
}