import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

/**
 * LanyardBadge Component
 * Hanging lanyard strap with metal clip and 3D swaying ID badge:
 * - Dark narrow strap with repeating typography ("DEVELOPER • PORTFOLIO • 2026").
 * - Silver metallic clip attaching to the badge slot.
 * - Dark rounded ID badge with top slot notch, initials logo, title, and subline.
 * - Light inner panel with rounded portrait frame (/public/me.jpg), name, role, and ID number.
 * - Pivots from top clip for realistic damped pendulum sway.
 */
export default function LanyardBadge({
  config,
  lanyardRef,
  badgeRef,
  mousePos = { x: 0, y: 0 },
}) {
  // Mouse reaction for slight pendulum sway
  const swayRotation = mousePos.x * 2.5;

  return (
    <div className="relative flex flex-col items-center pointer-events-auto select-none">
      
      {/* 
        1. LANYARD STRAP
        Enters from below feet as if hanging from the presenter
      */}
      <div 
        ref={lanyardRef}
        className="relative flex flex-col items-center z-10 will-change-transform"
      >
        {/* Dark Narrow Band Strap */}
        <div className="w-8 sm:w-9 h-32 sm:h-44 bg-[#111111] border-x border-white/10 shadow-lg flex flex-col items-center justify-between py-2 overflow-hidden relative">
          {/* Repeating Small White Typography */}
          <div className="absolute inset-0 flex flex-col items-center justify-around pointer-events-none opacity-85 select-none text-[8px] font-mono tracking-widest text-white/90 uppercase [writing-mode:vertical-rl]">
            {config.badge.lanyardText || 'ADI REDDY EVENTS 2026 '}
          </div>
        </div>

        {/* Silver Metallic Clip */}
        <div className="relative z-20 flex flex-col items-center -mt-1">
          {/* Top Swivel Bar */}
          <div className="w-6 h-3 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-sm shadow-md border border-gray-400" />
          
          {/* Metal Trigger Clip */}
          <div className="w-3.5 h-6 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 rounded-xs shadow-inner" />
          
          {/* Split Key Ring Loop Hooking through Badge Slot */}
          <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent -mt-1.5 shadow-sm" />
        </div>
      </div>

      {/* 
        2. 3D SWAYING ID BADGE
        Slides up and attaches to clip, pivots with pendulum damping
      */}
      <div
        ref={badgeRef}
        className="relative z-20 will-change-transform origin-top -mt-2 transition-transform duration-300 ease-out"
        style={{
          transform: `rotate(${swayRotation}deg)`,
        }}
      >
        {/* Main Dark Rounded Badge Shell */}
        <div className="w-64 sm:w-72 bg-[#111111] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden backdrop-blur-md">
          
          {/* Top Lanyard Slot / Notch Cutout Graphic */}
          <div className="w-10 h-2 rounded-full bg-[#1F1F1F] border border-white/20 mx-auto -mt-1 mb-3 shadow-inner" />

          {/* Badge Header: Initials Logo, Title & Subline */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              {/* Circular Initials Logo */}
              <div className="w-7 h-7 rounded-full bg-[#3B2F8F] text-white font-bold text-xs flex items-center justify-center shadow-inner border border-white/20">
                {config.badge.initials || 'AR'}
              </div>
              
              <div>
                <h4 className="font-sans font-extrabold text-xs tracking-wider text-white uppercase leading-none">
                  {config.badge.title || 'DEVELOPER ID'}
                </h4>
                <span className="text-[9px] font-sans text-white/50 tracking-wide block mt-0.5">
                  {config.badge.subline || 'Events 2026'}
                </span>
              </div>
            </div>

            <ShieldCheck className="w-4 h-4 text-[#3B2F8F]" />
          </div>

          {/* 
            Light Inner Panel:
            Rounded portrait frame (/public/me.jpg), Name, Role, ID Number
          */}
          <div className="mt-3.5 bg-[#F2F0E6] text-[#111111] rounded-xl p-3.5 shadow-inner">
            
            <div className="flex items-center space-x-3">
              {/* Rounded Portrait Frame */}
              <div className="w-16 h-20 rounded-lg overflow-hidden border border-black/10 bg-gray-200 flex-shrink-0 shadow-sm">
                <img
                  src={config.badge.photo}
                  alt={config.badge.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Identity Details */}
              <div className="flex-1 min-w-0">
                <span className="text-[8px] uppercase tracking-widest text-black/50 font-sans font-semibold block">
                  NAME
                </span>
                <h5 className="font-sans font-black text-sm text-[#111111] truncate tracking-tight">
                  {config.badge.name}
                </h5>

                <span className="text-[8px] uppercase tracking-widest text-black/50 font-sans font-semibold block mt-1.5">
                  ROLE
                </span>
                <p className="font-sans text-[11px] font-semibold text-[#3B2F8F] truncate leading-tight">
                  {config.badge.role}
                </p>

                <div className="mt-2 pt-1 border-t border-black/10 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-black/50">ID NUMBER</span>
                  <span className="font-bold text-[#111111]">{config.badge.idNumber}</span>
                </div>
              </div>
            </div>

            {/* Micro Barcode & Hologram Verification Strip */}
            <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between">
              <div className="flex items-center space-x-0.5 h-4 opacity-75">
                <div className="w-0.5 h-full bg-black" />
                <div className="w-1 h-full bg-black" />
                <div className="w-0.5 h-full bg-black" />
                <div className="w-1.5 h-full bg-black" />
                <div className="w-0.5 h-full bg-black" />
                <div className="w-1 h-full bg-black" />
                <div className="w-2 h-full bg-black" />
                <div className="w-0.5 h-full bg-black" />
                <div className="w-1 h-full bg-black" />
              </div>

              <span className="text-[8px] font-mono font-bold tracking-widest uppercase text-[#3B2F8F]">
                ★ VERIFIED ACCESS ★
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}


