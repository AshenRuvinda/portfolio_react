import React, { useState, useRef, useEffect } from 'react';
import './ServicesCarousel.css';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef(null);

  const services = [
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      description: 'Create modern, responsive websites and web applications using cutting-edge technologies like React, Next.js, and TypeScript. From simple landing pages to complex web platforms.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Apps',
      description: 'Develop cross-platform mobile applications for iOS and Android using React Native and Flutter. Native performance with a single codebase.'
    },
    {
      icon: 'fas fa-server',
      title: 'Backend Development',
      description: 'Build robust server-side applications, APIs, and microservices using Node.js, Python, and cloud technologies. Scalable and secure backend solutions.'
    },
    {
      icon: 'fas fa-database',
      title: 'Database Design',
      description: 'Design and optimize database architectures using SQL and NoSQL databases. Ensure data integrity, performance, and scalability for your applications.'
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'UI/UX Design',
      description: 'Create beautiful, user-friendly interfaces and experiences. From wireframes to pixel-perfect designs using Figma, Adobe XD, and modern design principles.'
    },
    {
      icon: 'fas fa-cloud',
      title: 'Cloud Services',
      description: 'Deploy and manage applications on cloud platforms like AWS, Google Cloud, and Azure. DevOps, CI/CD pipelines, and infrastructure as code.'
    }
  ];

  const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalSlides = services.length;

  const goToSlide = (slideIndex) => {
    // Allow infinite scrolling by wrapping around
    let newSlide = slideIndex;
    if (slideIndex < 0) {
      newSlide = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
      newSlide = 0;
    }
    
    setCurrentSlide(newSlide);
    
    if (trackRef.current) {
      const cardWidth = 340;
      const gap = 30;
      const offset = newSlide * (cardWidth + gap);
      trackRef.current.style.transform = `translateX(-${offset}px)`;
    }
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  // Touch/Mouse drag handlers
  const handleStart = (e) => {
    setIsDragging(true);
    const x = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setStartX(x);
    setScrollLeft(currentSlide);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = startX - x;
    const threshold = 100;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - go to next
        setIsDragging(false);
      } else {
        prevSlide(); // Swipe right - go to previous
        setIsDragging(false);
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedService) {
        if (e.key === 'Escape') closeModal();
        return;
      }
      
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, selectedService]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      goToSlide(0); // Reset to first slide on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
      
      <section id="services" className="services-carousel">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">My Services</h2>
            <p className="services-subtitle">Professional solutions tailored to your needs</p>
          </div>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              ref={trackRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card"
                  onClick={() => openModal(service)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="service-card-content">
                    <div className="service-icon">
                      <i className={service.icon}></i>
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {services.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {selectedService && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-icon">
                  <i className={selectedService.icon}></i>
                </div>
                <h3 className="modal-title">{selectedService.title}</h3>
              </div>
              <p className="modal-description">{selectedService.description}</p>
              <button className="modal-close" onClick={closeModal}>
                Got it
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Services;