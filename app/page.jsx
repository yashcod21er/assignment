'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const headline = 'WELCOME ITZFIZZ'.split('');

const metrics = [
  {
    value: '58%',
    label: 'Increase in pick up point use',
    className: 'bg-[#def54f] text-[#111] top-[5%] right-[28%]',
  },
  {
    value: '23%',
    label: 'Decreased in customer phone calls',
    className: 'bg-[#6ac9ff] text-[#111] bottom-[5%] right-[34%]',
  },
  {
    value: '27%',
    label: 'Increase in pick up point use',
    className: 'bg-[#333333] text-white top-[5%] right-[8%]',
  },
  {
    value: '40%',
    label: 'Decreased in customer phone calls',
    className: 'bg-[#fa7328] text-[#111] bottom-[5%] right-[10%]',
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial page load animation
      const introTl = gsap.timeline();

      introTl
        .fromTo(
          lettersRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.25, y: 0, stagger: 0.03, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          carRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.stat-box',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );

      // 2. Scroll-based animation
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: trackRef.current,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      // Move car horizontally across road
      scrollTl.to(car, {
        x: () => road.clientWidth - (car.clientWidth || 360) * 0.7,
        ease: 'none',
      }, 0);

      // Expand trail behind the car using scaleX (GPU accelerated, no reflow)
      scrollTl.fromTo(
        trail,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left center' },
        0
      );

      // Reveal headline letters as car drives over them
      lettersRef.current.forEach((letter) => {
        if (!letter) return;
        const progress = letter.offsetLeft / road.clientWidth;
        scrollTl.to(
          letter,
          { opacity: 1, duration: 0.02, ease: 'none' },
          progress
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section (occupies first screen, pinned on scroll) */}
      <section ref={containerRef} className="relative h-[220vh]">
        <div
          ref={trackRef}
          className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#d1d1d1] overflow-hidden"
        >
          {/* Road */}
          <div
            ref={roadRef}
            className="relative w-full h-[170px] md:h-[200px] bg-[#1e1e1e] overflow-hidden flex items-center shadow-lg"
          >
            {/* Trail */}
            <div
              ref={trailRef}
              className="absolute top-0 left-0 w-full h-full bg-[#45db7d] origin-left z-[1]"
            />

            {/* Letter-spaced headline */}
            <div className="absolute top-1/2 left-[5vw] -translate-y-1/2 flex items-center gap-1 sm:gap-2 text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-[#111] z-[2] select-none whitespace-nowrap">
              {headline.map((char, i) => (
                <span
                  key={i}
                  ref={(el) => (lettersRef.current[i] = el)}
                  className="inline-block opacity-0"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>

            {/* Car */}
            <div
              ref={carRef}
              className="absolute top-0 left-0 h-full flex items-center z-[3] pointer-events-none"
            >
              <img
                src="/mclaren.png"
                alt="Car"
                className="h-[92%] w-auto object-contain drop-shadow-md select-none"
              />
            </div>
          </div>

          {/* Impact metrics / statistics */}
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={`stat-box absolute p-4 md:p-6 rounded-xl flex flex-col justify-center max-w-[220px] md:max-w-[300px] shadow-md z-10 ${item.className}`}
            >
              <span className="text-3xl md:text-5xl font-bold leading-none">
                {item.value}
              </span>
              <p className="text-xs md:text-sm font-medium mt-1 leading-snug">
                {item.label}
              </p>
            </div>
          ))}

          {/* Scroll hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-neutral-600 tracking-wider">
            SCROLL TO DRIVE ↓
          </div>
        </div>
      </section>

      {/* Brief section below hero */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <p className="text-xs font-mono text-[#def54f] uppercase tracking-wider mb-2">
          GSAP · Next.js · React · Tailwind CSS
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Scroll becomes the accelerator.
        </h2>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          Assignment submission for the frontend developer internship. Recreated the scroll-driven car animation inspired by the live demo, using GSAP ScrollTrigger to map page scroll to horizontal car movement and headline reveal.
        </p>
      </section>
    </main>
  );
}
