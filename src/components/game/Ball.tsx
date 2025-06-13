import { cn } from "@/lib/utils";
import type { Position } from "../FootballGame";

interface BallProps {
  position: Position;
  isAnimating: boolean;
}

export const Ball = ({ position, isAnimating }: BallProps) => {
  return (
    <div
      className={cn(
        "absolute w-6 h-6 rounded-full bg-game-ball border-2 border-black/20 cursor-pointer transition-all duration-200 shadow-lg",
        isAnimating && "animate-bounce-ball"
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0, #e0e0e0)',
      }}
    >
      {/* Ball pattern */}
      <div className="absolute inset-0 rounded-full">
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <g stroke="#333" strokeWidth="0.5" fill="none">
            {/* Pentagon in center */}
            <polygon points="12,8 15,10 14,14 10,14 9,10" fill="#333" opacity="0.1" />
            {/* Hexagon lines */}
            <path d="M12,4 L16,7 L16,12 L12,15 L8,12 L8,7 Z" opacity="0.2" />
            <path d="M6,9 L10,6 L14,6 L18,9" opacity="0.2" />
            <path d="M6,15 L10,18 L14,18 L18,15" opacity="0.2" />
          </g>
        </svg>
      </div>
      
      {/* Ball shadow */}
      <div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-2 bg-black/40 rounded-full blur-sm"
        style={{ zIndex: -1 }}
      />
      
      {/* Ball highlight */}
      <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full blur-sm" />
    </div>
  );
};