import { useEffect, useState } from 'react';

const slides = [
  {
    src: '/images/platforms-bg.png',
    alt: 'Technology and cloud infrastructure background',
    title: 'High-Assurance Digital Services',
    description: 'Modular engineering practices purpose-built to accelerate production timetables while neutralizing operational risk.',
  },
  {
    src: '/images/services/cloud-solutions.jpg',
    alt: 'Cloud infrastructure and connected devices',
    title: 'Cloud Solutions',
    description: 'Secure, scalable infrastructure built around your business.',
  },
  {
    src: '/images/services/custom-software.jpg',
    alt: 'Custom software development team',
    title: 'Custom Software Development',
    description: 'Purpose-built digital products for the way your teams work.',
  },
  {
    src: '/images/services/ai-automation.jpg',
    alt: 'Team working with AI and automation tools',
    title: 'AI & Machine Learning',
    description: 'Practical AI and automation to make work simpler.',
  },
  {
    src: '/images/services/devops.jpg',
    alt: 'DevOps and software delivery',
    title: 'DevOps & CI/CD',
    description: 'Reliable delivery workflows from development to production.',
  },
  {
    src: '/images/services/cyber.jpg',
    alt: 'Cybersecurity operations',
    title: 'Cybersecurity & Compliance',
    description: 'Security practices that protect the systems you depend on.',
  },
  {
    src: '/images/services/Android.jpg',
    alt: 'Mobile app development',
    title: 'Mobile App Development',
    description: 'Thoughtful mobile experiences for customers and teams.',
  },
];

export default function ServicesCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <div aria-label="Featured services" aria-roledescription="carousel" className="services-hero-carousel">
      <div
        className="services-carousel-track"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-roledescription="slide"
            className="services-carousel-slide"
            key={slide.src}
            aria-hidden={index !== activeSlide}
            style={{ '--slide-image': `url("${slide.src}")` }}
          >
            <img
              alt={slide.alt}
              className="services-carousel-image"
              loading={index === 0 ? 'eager' : 'lazy'}
              src={slide.src}
            />
          </div>
        ))}
      </div>

      <button
        aria-label="Previous service image"
        className="services-carousel-arrow services-carousel-previous"
        onClick={showPrevious}
        type="button"
      >
        <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
      </button>
      <button
        aria-label="Next service image"
        className="services-carousel-arrow services-carousel-next"
        onClick={showNext}
        type="button"
      >
        <span aria-hidden="true" className="material-symbols-outlined">arrow_forward</span>
      </button>

      <div aria-label="Choose a service image" className="services-carousel-dots">
        {slides.map((slide, index) => (
          <button
            aria-current={index === activeSlide ? 'true' : undefined}
            aria-label={`Show image ${index + 1}: ${slide.title}`}
            className={`services-carousel-dot ${index === activeSlide ? 'is-active' : ''}`}
            key={slide.src}
            onClick={() => setActiveSlide(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
