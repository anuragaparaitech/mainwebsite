import { useState, useEffect, useRef } from 'react';

/**
 * Reusable Image Carousel / Slideshow component.
 *
 * @param {Object} props
 * @param {Array<{src: string, title?: string, description?: string, tag?: string}>} props.slides - List of slide objects
 * @param {number} [props.interval=4500] - Autoplay transition interval in ms (4-5s default)
 * @param {string} [props.aspectRatio='aspect-[16/9]'] - Tailwind aspect ratio class
 * @param {string} [props.className=''] - Additional container classes
 * @param {boolean} [props.showCaptions=true] - Whether to show slide captions
 */
export default function ImageCarousel({
  slides = [],
  interval = 4500,
  aspectRatio = 'aspect-[16/10] sm:aspect-[16/9]',
  className = '',
  showCaptions = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const total = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Autoplay effect every 4–5 seconds, paused on user hover
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, interval, isPaused]);

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-slate-900 group select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Image Carousel"
    >
      {/* Slides Container */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.src}
                alt={slide.title || `Slide ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Gradient overlay for text legibility and aesthetic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              {/* Slide Caption Box */}
              {showCaptions && (slide.title || slide.description) && (
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white z-20">
                  {slide.tag && (
                    <span className="inline-block px-2.5 py-1 rounded bg-blue-600/80 backdrop-blur-sm text-cyan-200 text-[11px] font-mono-tag font-bold uppercase tracking-wider mb-2">
                      {slide.tag}
                    </span>
                  )}
                  {slide.title && (
                    <h4 className="text-base sm:text-xl font-bold tracking-tight text-white mb-1">
                      {slide.title}
                    </h4>
                  )}
                  {slide.description && (
                    <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed line-clamp-2">
                      {slide.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>

          {/* Pagination Indicator Dots */}
          <div className="absolute bottom-3 right-5 z-30 flex items-center gap-1.5">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === currentIndex
                    ? 'w-6 h-2 bg-[#2563EB]'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
