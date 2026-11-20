import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PrimaryButton
 * Premium agency-grade action button with refined hover lift, active press feedback,
 * gentle arrow slide animation, and visible keyboard focus ring.
 *
 * @param {'forest' | 'crimson'} variant - 'crimson' for high-priority CTA, 'forest' for primary actions
 */
export default function PrimaryButton({
  children,
  to,
  onClick,
  variant = 'forest',
  type = 'button',
  className = '',
  disabled = false,
  icon: Icon,
  ...rest
}) {
  const baseClasses = `
    inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em]
    px-6 sm:px-8 py-3.5 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
    hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `;

  const variantClasses = {
    forest: 'bg-forest text-ivory hover:bg-forest-light border border-forest hover:border-gold/40 shadow-subtle hover:shadow-card',
    crimson: 'bg-crimson text-white hover:bg-crimson-hover border border-crimson shadow-subtle hover:shadow-card',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.forest} ${className}`.trim();

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
