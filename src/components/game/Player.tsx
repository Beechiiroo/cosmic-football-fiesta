import { cn } from "@/lib/utils";
import type { PlayerData } from "../FootballGame";

interface PlayerProps {
  player: PlayerData;
  onClick: () => void;
  isAnimating: boolean;
}

export const Player = ({ player, onClick, isAnimating }: PlayerProps) => {
  const getPlayerColor = () => {
    return player.team === 'home' ? 'bg-team-home' : 'bg-team-away';
  };

  const getPlayerNumber = () => {
    const number = parseInt(player.id.slice(1));
    return number;
  };

  return (
    <div
      className={cn(
        "absolute w-8 h-8 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white/50",
        getPlayerColor(),
        player.isSelected && "ring-4 ring-game-highlight ring-opacity-80 animate-pulse-glow scale-110",
        isAnimating && "animate-run-player"
      )}
      style={{
        left: `${player.position.x}%`,
        top: `${player.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {getPlayerNumber()}
      
      {/* Player shadow */}
      <div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/30 rounded-full blur-sm"
        style={{ zIndex: -1 }}
      />
      
      {/* Selection indicator */}
      {player.isSelected && (
        <div className="absolute -inset-2 rounded-full border-2 border-game-highlight animate-ping" />
      )}
    </div>
  );
};