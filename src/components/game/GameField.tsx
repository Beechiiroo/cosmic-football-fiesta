import { forwardRef } from "react";
import type { Position } from "../FootballGame";

interface GameFieldProps {
  onClick: (position: Position) => void;
}

export const GameField = forwardRef<HTMLDivElement, GameFieldProps>(
  ({ onClick }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onClick({ x, y });
    };

    return (
      <div
        ref={ref}
        className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-field via-field to-field-dark cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        {/* Field markings */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Outer boundary */}
          <rect
            x="2"
            y="2"
            width="96"
            height="96"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          
          {/* Center line */}
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="98"
            stroke="white"
            strokeWidth="0.3"
          />
          
          {/* Center circle */}
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          
          {/* Center spot */}
          <circle
            cx="50"
            cy="50"
            r="1"
            fill="white"
          />
          
          {/* Left goal area */}
          <rect
            x="2"
            y="35"
            width="16"
            height="30"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          
          {/* Left goal */}
          <rect
            x="0"
            y="42"
            width="4"
            height="16"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
          />
          
          {/* Left small box */}
          <rect
            x="2"
            y="42"
            width="8"
            height="16"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          
          {/* Right goal area */}
          <rect
            x="82"
            y="35"
            width="16"
            height="30"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          
          {/* Right goal */}
          <rect
            x="96"
            y="42"
            width="4"
            height="16"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
          />
          
          {/* Right small box */}
          <rect
            x="90"
            y="42"
            width="8"
            height="16"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          
          {/* Left penalty spot */}
          <circle
            cx="12"
            cy="50"
            r="0.8"
            fill="white"
          />
          
          {/* Right penalty spot */}
          <circle
            cx="88"
            cy="50"
            r="0.8"
            fill="white"
          />
          
          {/* Corner arcs */}
          <path
            d="M 2 8 A 6 6 0 0 1 8 2"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          <path
            d="M 2 92 A 6 6 0 0 0 8 98"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          <path
            d="M 98 8 A 6 6 0 0 0 92 2"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
          <path
            d="M 98 92 A 6 6 0 0 1 92 98"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
          />
        </svg>
        
        {/* Field texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        
        {/* Animated grass effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent)] animate-pulse-glow"></div>
      </div>
    );
  }
);

GameField.displayName = "GameField";