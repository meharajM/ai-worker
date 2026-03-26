import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  delay = 0, 
  className = "", 
  children,
  onClick,
  variant = 'default',
  classNameIcon = "",
  classNameTitle = "",
  classNameDescription = "",
  centered = false
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  const variantStyles = {
    default: "bg-surface-card border-surface-border hover:border-brand-teal",
    outlined: "bg-transparent border-surface-border hover:border-brand-teal hover:bg-surface-hover",
    solid: "bg-surface-elevated border-transparent hover:bg-surface-hover"
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      onClick={onClick}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`p-8 rounded-3xl border transition-colors group flex flex-col h-full focus:outline-none ${centered ? 'items-center text-center' : 'items-start text-left'} ${onClick ? 'focus:ring-2 focus:ring-brand-teal focus:border-transparent' : ''} ${variantStyles[variant]} ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className}`}
    >
      {icon && (
        <div className={`w-14 h-14 rounded-2xl bg-surface-elevated flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${centered ? 'mx-auto' : ''} ${classNameIcon}`}>
          <div className="text-brand-teal">
            {icon}
          </div>
        </div>
      )}
      <h3 className={`text-xl font-bold mb-3 text-white ${classNameTitle}`}>{title}</h3>
      <p className={`text-gray-400 leading-relaxed text-sm break-words line-clamp-3 group-hover:line-clamp-none mb-6 flex-grow ${classNameDescription}`}>
        {description}
      </p>
      {children && (
        <div className="mt-auto pt-4">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default FeatureCard;