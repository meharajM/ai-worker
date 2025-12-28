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
  classNameDescription = ""
}) => {
  
  const variantStyles = {
    default: "bg-brand-card border-white/5 hover:border-white/10",
    outlined: "bg-transparent border-white/10 hover:border-brand-teal/50 hover:bg-white/5",
    solid: "bg-[#1e293b] border-transparent hover:bg-[#334155]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      onClick={onClick}
      className={`p-8 rounded-3xl border transition-colors group flex flex-col h-full ${variantStyles[variant]} ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className}`}
    >
      {icon && (
        <div className={`w-14 h-14 rounded-2xl bg-[#1e293b]/50 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ${classNameIcon}`}>
          <div className="text-brand-teal">
            {icon}
          </div>
        </div>
      )}
      <h3 className={`text-xl font-bold mb-3 text-white ${classNameTitle}`}>{title}</h3>
      <p className={`text-gray-400 leading-relaxed mb-6 flex-grow ${classNameDescription}`}>
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