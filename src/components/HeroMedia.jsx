import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

// ---- EDIT HERE -------------------------------------------------------------
// Put your video in  public/videos/  and your still image in  public/images/
const VIDEO_SRC = '/videos/hero.mp4'; // MP4 (H.264), ~10s, no audio, under ~10 MB
// Still image shown while the video loads, if it fails, or with "reduce motion".
// Temporary link from the Stitch export: replace with your own file, e.g. '/images/hero-poster.jpg'.
const POSTER_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBtJGVggz2cAUvWcB_rYSzu7zka9U3yw9FTfThr0680gu_PwukWCnJ-lTfypoysQ4ZA-bZ4cIg7Yi-e90xyohKjaX071al1fBcEzYrsfXbPZsPMjKZv-V2irXjwY4D7E9LVt4-8oJFUWBrqV7Y2TQNzRl92TmP8791mtobJHt24b15T9CZokrDE0x7Ki-F2lTEKHRWUDw1qh2s4Fltt2fbWzIxDBZhLnobdtHHciLRq';
const ALT = 'Engineers working in a modern software operations center';
// ----------------------------------------------------------------------------

const MEDIA_CLASS = 'w-full h-full object-cover object-center';

/**
 * Full-bleed hero background (sits behind the dark overlay and all hero content).
 * - Plays VIDEO_SRC muted, looping, inline (required for autoplay).
 * - Falls back to the still image if the video file is missing/unsupported,
 *   or if the visitor has "reduce motion" turned on.
 */
export default function HeroMedia() {
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // some browsers ignore the attribute
      videoRef.current.play().catch(() => {}); // autoplay can be blocked: poster stays visible
    }
  }, [reduced, failed]);

  if (reduced || failed) {
    return <img alt={ALT} className={MEDIA_CLASS} src={POSTER_SRC} />;
  }

  return (
    <video
      ref={videoRef}
      className={MEDIA_CLASS}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER_SRC}
      aria-label={ALT}
    >
      <source src={VIDEO_SRC} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}
