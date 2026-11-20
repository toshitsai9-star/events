import React, { useState, useEffect } from 'react';

/**
 * CountdownTimer Component
 * Small elegant live countdown timer to the event date (days : hours : minutes : seconds).
 */
export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-start lg:items-end">
      <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-black/50 block font-bold mb-1">
        EVENT COUNTDOWN
      </span>

      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/70 backdrop-blur-xs border border-black/5 shadow-xs font-mono text-[#111111]">
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-black leading-none">{timeLeft.days}</span>
          <span className="text-[7px] text-black/40 font-sans uppercase">DAYS</span>
        </div>
        <span className="text-black/30 text-xs font-bold -mt-2">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-black leading-none">{timeLeft.hours}</span>
          <span className="text-[7px] text-black/40 font-sans uppercase">HRS</span>
        </div>
        <span className="text-black/30 text-xs font-bold -mt-2">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-black leading-none">{timeLeft.minutes}</span>
          <span className="text-[7px] text-black/40 font-sans uppercase">MIN</span>
        </div>
        <span className="text-black/30 text-xs font-bold -mt-2">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-black text-[#3B2F8F] leading-none">{timeLeft.seconds}</span>
          <span className="text-[7px] text-[#3B2F8F]/70 font-sans uppercase">SEC</span>
        </div>
      </div>
    </div>
  );
}

