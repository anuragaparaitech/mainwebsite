import { useState } from 'react';

// ---- EDIT HERE -------------------------------------------------------------
// 1) Put your logo file(s) in  public/images/  and set the paths below.
// 2) LOGO_ON_DARK  = version used over the hero video / dark footer (usually a white logo).
//    LOGO_ON_LIGHT = version used on white backgrounds (header after scroll, menu).
//    If you only have one logo file, use the same path for both.
// 3) Set SHOW_NAME to false if your logo image already contains the word "AparaiTech".
const LOGO_ON_DARK = '/images/logo.png';
const LOGO_ON_LIGHT = '/images/logo.png';
const SHOW_NAME = true;
// ----------------------------------------------------------------------------

const SIZES = {
  lg: { img: 'h-14', badge: 'w-14 h-14 rounded-xl text-2xl', dot: 'w-2.5 h-2.5 bottom-1 right-1', name: 'font-headline-lg text-[28px] leading-none', gap: 'gap-3.5' },
  md: { img: 'h-10', badge: 'w-10 h-10 rounded-lg text-lg', dot: 'w-2 h-2 bottom-0.5 right-0.5', name: 'font-headline-sm text-headline-sm', gap: 'gap-3' },
  sm: { img: 'h-8', badge: 'w-8 h-8 rounded text-base', dot: 'w-1.5 h-1.5 bottom-0.5 right-0.5', name: 'font-headline-sm text-headline-sm', gap: 'gap-3' },
};

/**
 * Brand logo. Shows your logo image (and the "AparaiTech" name once, if SHOW_NAME is true).
 * If the image file is missing, it falls back to the original "A" badge so the page never breaks.
 */
export default function Logo({ size = 'lg', onDark = false, nameClassName = '', nameId }) {
  const [failed, setFailed] = useState(false);
  const s = SIZES[size];
  const showName = SHOW_NAME || failed;

  return (
    <span className={`flex items-center ${s.gap} select-none`}>
      {failed ? (
        <span className={`${s.badge} bg-[#0F172A] border border-blue-500/30 text-white font-bold tracking-tighter flex items-center justify-center relative shrink-0`}>
          A
          <span className={`absolute ${s.dot} rounded-full bg-[#2563EB]`} />
        </span>
      ) : (
        <img
          src={onDark ? LOGO_ON_DARK : LOGO_ON_LIGHT}
          alt={showName ? '' : 'Aparaitech'}
          className={`${s.img} w-auto object-contain shrink-0`}
          onError={() => setFailed(true)}
        />
      )}
      {showName && (
        <span id={nameId} className={`${s.name} font-bold tracking-tight transition-colors duration-300 ${nameClassName}`}>
          Aparaitech
        </span>
      )}
    </span>
  );
}