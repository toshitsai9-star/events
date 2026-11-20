import React from 'react';
import { ShieldCheck, QrCode } from 'lucide-react';

/**
 * EventPass Component
 * 
 * Includes:
 * 1. Lanyard Strap:
 *    - Dark narrow woven band entering from below feet.
 *    - Repeating small white text (event name • year • city).
 *    - Silver metallic swivel clip & loop.
 * 2. Event Pass (Attendee ID):
 *    - Top slot/notch graphic.
 *    - Small circular event logo, bold title "EVENT PASS", and muted subline.
 *    - Light inner panel with rounded attendee photo frame, name, ticket type, and pass number.
 *    - Small QR code placeholder linking to registration.
 *    - Damped pendulum sway (±3°) pivoting from the clip, reacting slightly to mouse movement.
 *    - Live personalized attendee name support.
 */
export default function EventPass({
  config,
  lanyardRef,
  passRef,
  attendeeName = '',
  mousePos = { x: 0, y: 0 },
}) {
  // Reaction to mouse movement for organic sway
  const swayRotation = mousePos.x * 2.5;

  const displayName = attendeeName.trim()
    ? attendeeName.toUpperCase()
    : config.pass.defaultAttendeeName || 'GUEST DELEGATE';

  return (
    <div className="relative flex flex-col items-center pointer-events-auto select-none font-sans">
      
      {/* 
        1. LANYARD STRAP
        Enters from below feet as if hanging from presenter
      */}
      <div 
        ref={lanyardRef}
        className="relative flex flex-col items-center z-10 will-change-transform"
      >
        {/* Dark Narrow Band Ribbon with Repeating White Text */}
        <div className="w-8 sm:w-9 h-32 sm:h-44 bg-[#111111] border-x border-white/10 shadow-lg flex flex-col items-center justify-between py-2 overflow-hidden relative">
          <div className="absolute inset-0 flex flex-col items-center justify-around pointer-events-none opacity-85 select-none text-[8px] font-mono tracking-widest text-white/90 uppercase [writing-mode:vertical-rl]">
            {config.pass.lanyardText || `${config.event.name} • ${config.event.year} • ${config.event.city} • `}
          </div>
        </div>

        {/* Silver Metallic Clip Structure */}
        <div className="relative z-20 flex flex-col items-center -mt-1">
          {/* Top Swivel Bar */}
          <div className="w-6 h-3 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-xs shadow-md border border-gray-400" />
          
          {/* Metal Trigger Clip */}
          <div className="w-3.5 h-6 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 rounded-2xs shadow-inner" />
          
          {/* Key Loop Hooking into Pass Notch */}
          <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent -mt-1.5 shadow-xs" />
        </div>
      </div>

      {/* 
        2. 3D SWAYING EVENT PASS
        Pivots from the clip with damped pendulum sway
      */}
      <div
        ref={passRef}
        className="relative z-20 will-change-transform origin-top -mt-2 transition-transform duration-300 ease-out"
        style={{
          transform: `rotate(${swayRotation}deg)`,
        }}
      >
        {/* Dark Rounded Outer Pass Shell */}
        <div className="w-64 sm:w-72 bg-[#111111] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden backdrop-blur-md">
          
          {/* Top Slot / Notch Graphic */}
          <div className="w-10 h-2 rounded-full bg-[#222222] border border-white/20 mx-auto -mt-1 mb-3.5 shadow-inner" />

          {/* Header: Circular Logo, Title & Subline */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2.5">
              {/* Circular Event Logo */}
              <div className="w-7 h-7 rounded-full bg-[#3B2F8F] text-white font-extrabold text-xs flex items-center justify-center shadow-inner border border-white/20">
                {config.event.logoInitials || 'AR'}
              </div>
              
              <div>
                <h4 className="font-sans font-black text-xs tracking-wider text-white uppercase leading-none">
                  {config.pass.title || 'EVENT PASS'}
                </h4>
                <span className="text-[9px] font-sans text-white/50 tracking-wide block mt-0.5">
                  {config.pass.subline || `${config.event.name} · ${config.event.year}`}
                </span>
              </div>
            </div>

            <ShieldCheck className="w-4 h-4 text-[#3B2F8F]" />
          </div>

          {/* 
            Light Inner Panel:
            Attendee Photo Frame, Name, Ticket Type, Pass Number
          */}
          <div className="mt-3.5 bg-[#F2F0E6] text-[#111111] rounded-xl p-3.5 shadow-inner">
            
            <div className="flex items-center space-x-3">
              {/* Rounded Attendee Photo Frame */}
              <div className="w-16 h-20 rounded-lg overflow-hidden border border-black/10 bg-gray-200 flex-shrink-0 shadow-xs">
                <img
                  src={config.pass.photo}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Attendee Details */}
              <div className="flex-1 min-w-0">
                <span className="text-[8px] uppercase tracking-widest text-black/50 font-mono font-semibold block">
                  ATTENDEE NAME
                </span>
                <h5 className="font-sans font-black text-sm text-[#111111] truncate tracking-tight">
                  {displayName}
                </h5>

                <span className="text-[8px] uppercase tracking-widest text-black/50 font-mono font-semibold block mt-1.5">
                  TICKET TYPE
                </span>
                <p className="font-sans text-[11px] font-bold text-[#3B2F8F] truncate leading-tight">
                  {config.pass.ticketType || 'VIP ALL-ACCESS'}
                </p>

                <div className="mt-2 pt-1 border-t border-black/10 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-black/50">PASS NO.</span>
                  <span className="font-bold text-[#111111]">{config.pass.passNumber}</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: QR Code Placeholder Linking to Registration */}
            <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between">
              <a
                href={config.pass.qrTarget || '/gallery-contact'}
                className="flex items-center space-x-1.5 text-black hover:text-[#3B2F8F] transition-colors"
                title="Scan to verify pass"
              >
                <QrCode className="w-5 h-5 text-black" />
                <span className="text-[8px] font-mono tracking-wider uppercase text-black/60 font-semibold">
                  SCAN TO VERIFY
                </span>
              </a>

              <span className="text-[8px] font-mono font-black tracking-widest uppercase text-[#3B2F8F]">
                ★ OFFICIAL DELEGATE ★
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

