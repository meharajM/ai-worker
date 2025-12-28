import React from 'react';

export enum MessageSender {
  USER = 'user',
  AI = 'ai'
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  isProcessing?: boolean;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outlined' | 'solid';
  classNameIcon?: string;
  classNameTitle?: string;
  classNameDescription?: string;
}