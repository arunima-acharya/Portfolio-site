'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video     = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.pause();
    video.currentTime = 0;

    let targetTime   = 0;
    let currentTime  = 0;
    let scrollProgress = 0;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      if (video.readyState >= 2 && video.duration) {
        currentTime = lerp(currentTime, targetTime, 0.18);

        // Snap to exact ends so first/last frames are always clean
        if (scrollProgress <= 0)   currentTime = 0;
        if (scrollProgress >= 0.99) currentTime = video.duration;

        video.currentTime = Math.min(currentTime, video.duration);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    let st: ScrollTrigger;

    const initScrollTrigger = () => {
      st?.kill();

      st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=200%',
        pin: true,
        // scrub: 0.3 gives GSAP light smoothing — less than scrub:true (1s lag)
        // Our RAF lerp handles the fine grain; GSAP handles coarse scroll jitter
        scrub: 0.3,
        anticipatePin: 1,
        pinSpacing: true,
        onUpdate(self) {
          scrollProgress = self.progress;
          if (video.duration) {
            targetTime = self.progress * video.duration;
          }
        },
      });

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', initScrollTrigger, { once: true });
    }

    video.load();

    return () => {
      cancelAnimationFrame(rafId);
      st?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Background video */}
      <video
        ref={videoRef}
        src="/background.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      />

      {/* Hero text overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 15%',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontSize: 'clamp(28px, 4.5vw, 64px)',
          fontWeight: 900,
          fontFamily: 'var(--font-manrope), sans-serif',
          color: '#ffffff',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: 0,
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          Hi, I Am Arunima!
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 1.6vw, 22px)',
          fontWeight: 400,
          fontFamily: 'var(--font-inter), sans-serif',
          color: '#ffffff',
          lineHeight: 1.5,
          letterSpacing: '-0.02em',
          margin: 0,
          marginBottom: '18px',
          maxWidth: '44ch',
        }}>
          A Product Designer specializing in creating intuitive digital experiences based in New Delhi, India.
        </p>

        <p style={{
          fontSize: '15px',
          fontFamily: 'var(--font-inter), sans-serif',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.7,
          margin: 0,
          marginBottom: '32px',
          maxWidth: '48ch',
        }}>
          Leveraging insights in user psychology and design principles, my approach enhances functionality with visual elegance, crafting intuitive digital products that people love to use.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', pointerEvents: 'auto' }}>
          <a
            href="/case-studies"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#ffffff', color: '#111', borderRadius: 9999,
              padding: '0.57em 1.33em', fontSize: '14px',
              fontFamily: 'var(--font-inter), sans-serif', textDecoration: 'none',
              fontWeight: 600,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8510a'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#111'; }}
          >
            View Work ↗
          </a>
          <a
            href="/assets/Arunima_Acharya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'transparent', color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.45)', borderRadius: 9999,
              padding: '0.57em 1.33em', fontSize: '14px',
              fontFamily: 'var(--font-inter), sans-serif', textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#111'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
          >
            Download Resume ↓
          </a>
        </div>
      </div>
    </div>
  );
}
