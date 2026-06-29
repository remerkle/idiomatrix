import type { ReactNode } from 'react';

type BadgeColor = 'green' | 'orange' | 'blue' | 'red' | 'purple' | 'yellow';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colors: Record<BadgeColor, string> = {
  green:  'bg-[#D7F5B1] text-[#46A302]',
  orange: 'bg-[#FFE8C0] text-[#CC7A00]',
  blue:   'bg-[#C8EDFF] text-[#1599D0]',
  red:    'bg-[#FFD4D4] text-[#CC3B3B]',
  purple: 'bg-[#F0D9FF] text-[#9B59B6]',
  yellow: 'bg-[#FFF8C0] text-[#CC9A00]',
};

export function Badge({ children, color = 'green', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
