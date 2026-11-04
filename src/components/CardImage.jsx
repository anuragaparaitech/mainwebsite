import { useState } from 'react';

/**
 * Image area for a card. Shows `src` (cropped to fill the box, zooms slightly on hover when the
 * card has the `group` class). If the file is missing it shows a navy placeholder with an icon,
 * so the layout never breaks while you are still adding pictures.
 *   muted = true  ->  grayscale/dimmed image (used for "To Be Launched" products)
 */
export default function CardImage({ src, alt, icon = 'image', className = '', muted = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-surface-container ${className}`}>
      {failed ? (
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
