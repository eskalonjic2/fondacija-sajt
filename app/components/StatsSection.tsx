"use client"; // Ovo označava da je ovo klijentska komponenta (za animacije)

import { useEffect, useState, useRef } from "react";

// Pomoćna komponenta za jedan broj
function Counter({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Pokreni samo jednom
        }
      },
      { threshold: 0.5 } // Pokreni kad je 50% elementa vidljivo
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing funkcija (da uspori pred kraj)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="bg-slate-50 py-16 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          
         

          {/* Druga kartica (Za 10k stavimo end={10} i suffix="k+") */}
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transform hover:-translate-y-1 transition duration-300">
            <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Odradjenih projekata</dt>
            <dd className="mt-2 text-4xl font-black text-blue-900">
              <Counter end={10} suffix="+" />
            </dd>
          </div>
          
          {/* Druga kartica (Za 10k stavimo end={10} i suffix="k+") */}
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transform hover:-translate-y-1 transition duration-300">
            <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Donatora i partnera</dt>
            <dd className="mt-2 text-4xl font-black text-blue-900">
              <Counter end={20} suffix="+" />
            </dd>
          </div>

          {/* Treća kartica */}
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transform hover:-translate-y-1 transition duration-300">
            <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Transparentnost</dt>
            <dd className="mt-2 text-4xl font-black text-blue-900">
              <Counter end={100} suffix="%" />
            </dd>
          </div>

        </div>
      </div>
    </section>
  );
}