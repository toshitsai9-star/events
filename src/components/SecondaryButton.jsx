import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SecondaryButton
 * Outlined / ghost luxury button with subtle hover lift, background transition,
 * gentle icon glide, and keyboard focus states.
 *
 * @param {'gold' | 'charcoal' | 'ivory'} variant - border & text color scheme
 */
export default function SecondaryButton({
  children,
  to,
  onClick,
  variant = 'gold',
  type = 'button',
  className = '',
  disabled = false,
  icon: Icon,
  ...rest
}) {
  const baseClasses = `
    inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em]
    px-6 sm:px-8 py-3.5 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2
    hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `;

  const variantClasses = {
    gold: 'border border-gold text-charcoal hover:bg-gold hover:text-white bg-transparent shadow-subtle hover:shadow-card',
    charcoal: 'border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory bg-transparent shadow-subtle',
    ivory: 'border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory hover:text-forest bg-transparent shadow-subtle',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.gold} ${className}`.trim();

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {Icon && <Icon className="ml-2.5 w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedClasses}`} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${combinedClasses}`}
      {...rest}
    >
      {content}
    </button>
  );
}
