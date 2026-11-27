import { useEffect, useState } from 'react';

export default function CardImage({ src, alt, icon = 'image', className = '', muted = false }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-surface-container ${className}`}>
      {failed || !src ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-container to-secondary-container/60 text-on-primary-container">
          <span className="material-symbols-outlined text-[40px]">{icon}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${muted ? 'grayscale opacity-70' : ''}`}
        />
      )}
    </div>
  );
}
