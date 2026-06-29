import type { ReactNode, MouseEvent } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  accent?: string;
}

export function Card({ children, className = '', onClick, accent }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={accent ? { borderBottomColor: accent } : undefined}
      className={[
        'bg-white rounded-2xl border-2 border-[#E5E5E5] border-b-4 p-4',
        onClick ? 'cursor-pointer hover:bg-[#F7F7F7] transition-colors' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
