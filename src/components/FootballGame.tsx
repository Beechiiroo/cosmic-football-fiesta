import { useState, useEffect, useCallback, useRef } from "react";
import { GameField } from "./game/GameField";
import { Player } from "./game/Player";
import { Ball } from "./game/Ball";
import { ScoreBoard } from "./game/ScoreBoard";
import { GameControls } from "./game/GameControls";
import { useToast } from "@/hooks/use-toast";

export interface Position {
  x: number;
  y: number;
}

export interface PlayerData {
  id: string;
  position: Position;
  team: 'home' | 'away';
  isSelected: boolean;
}

export interface GameState {
  players: PlayerData[];
  ball: Position;
  score: { home: number; away: number };
  gameTime: number;
  isPlaying: boolean;
}

export const FootballGame = () => {
  const { toast } = useToast();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const [gameState, setGameState] = useState<GameState>({
    players: [
      // Home team (blue)
      { id: 'h1', position: { x: 20, y: 50 }, team: 'home', isSelected: false },
      { id: 'h2', position: { x: 30, y: 30 }, team: 'home', isSelected: false },
      { id: 'h3', position: { x: 30, y: 70 }, team: 'home', isSelected: false },
      { id: 'h4', position: { x: 40, y: 50 }, team: 'home', isSelected: false },
      // Away team (red)
      { id: 'a1', position: { x: 80, y: 50 }, team: 'away', isSelected: false },
      { id: 'a2', position: { x: 70, y: 30 }, team: 'away', isSelected: false },
      { id: 'a3', position: { x: 70, y: 70 }, team: 'away', isSelected: false },
      { id: 'a4', position: { x: 60, y: 50 }, team: 'away', isSelected: false },
    ],
    ball: { x: 50, y: 50 },
    score: { home: 0, away: 0 },
    gameTime: 0,
    isPlaying: false
  });

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState.isPlaying) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          gameTime: prev.gameTime + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isPlaying]);

  const selectPlayer = useCallback((playerId: string) => {
    setSelectedPlayer(playerId);
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(player => ({
        ...player,
        isSelected: player.id === playerId
      }))
    }));
  }, []);

  const movePlayer = useCallback((playerId: string, newPosition: Position) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(player =>
        player.id === playerId ? { ...player, position: newPosition } : player
      )
    }));
  }, []);

  const moveBall = useCallback((newPosition: Position) => {
    setGameState(prev => ({
      ...prev,
      ball: newPosition
    }));
    
    // Check for goals
    if (newPosition.x <= 5 && newPosition.y >= 35 && newPosition.y <= 65) {
      setGameState(prev => ({
        ...prev,
        score: { ...prev.score, away: prev.score.away + 1 },
        ball: { x: 50, y: 50 } // Reset ball to center
      }));
      toast({
        title: "GOAL!",
        description: "Away team scores!",
        duration: 3000,
      });
    } else if (newPosition.x >= 95 && newPosition.y >= 35 && newPosition.y <= 65) {
      setGameState(prev => ({
        ...prev,
        score: { ...prev.score, home: prev.score.home + 1 },
        ball: { x: 50, y: 50 } // Reset ball to center
      }));
      toast({
        title: "GOAL!",
        description: "Home team scores!",
        duration: 3000,
      });
    }
  }, [toast]);

  const toggleGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      players: [
        { id: 'h1', position: { x: 20, y: 50 }, team: 'home', isSelected: false },
        { id: 'h2', position: { x: 30, y: 30 }, team: 'home', isSelected: false },
        { id: 'h3', position: { x: 30, y: 70 }, team: 'home', isSelected: false },
        { id: 'h4', position: { x: 40, y: 50 }, team: 'home', isSelected: false },
        { id: 'a1', position: { x: 80, y: 50 }, team: 'away', isSelected: false },
        { id: 'a2', position: { x: 70, y: 30 }, team: 'away', isSelected: false },
        { id: 'a3', position: { x: 70, y: 70 }, team: 'away', isSelected: false },
        { id: 'a4', position: { x: 60, y: 50 }, team: 'away', isSelected: false },
      ],
      ball: { x: 50, y: 50 },
      score: { home: 0, away: 0 },
      gameTime: 0,
      isPlaying: false
    });
    setSelectedPlayer(null);
  }, []);

  const handleFieldClick = useCallback((position: Position) => {
    if (selectedPlayer) {
      movePlayer(selectedPlayer, position);
      
      // Move ball if player is close to it
      const player = gameState.players.find(p => p.id === selectedPlayer);
      if (player) {
        const distanceToBall = Math.sqrt(
          Math.pow(player.position.x - gameState.ball.x, 2) +
          Math.pow(player.position.y - gameState.ball.y, 2)
        );
        
        if (distanceToBall < 8) {
          // Calculate ball movement direction
          const angle = Math.atan2(position.y - player.position.y, position.x - player.position.x);
          const ballNewX = Math.max(5, Math.min(95, gameState.ball.x + Math.cos(angle) * 15));
          const ballNewY = Math.max(5, Math.min(95, gameState.ball.y + Math.sin(angle) * 15));
          moveBall({ x: ballNewX, y: ballNewY });
        }
      }
    }
  }, [selectedPlayer, gameState.players, gameState.ball, movePlayer, moveBall]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2 animate-slide-in">
            ⚽ Football Champions
          </h1>
          <p className="text-emerald-200 text-lg">
            The ultimate football gaming experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Controls */}
          <div className="lg:col-span-1">
            <GameControls
              isPlaying={gameState.isPlaying}
              onToggleGame={toggleGame}
              onResetGame={resetGame}
              selectedPlayer={selectedPlayer}
              gameTime={gameState.gameTime}
            />
          </div>

          {/* Game Field */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-field via-field to-field-dark rounded-xl shadow-2xl overflow-hidden">
              <GameField 
                onClick={handleFieldClick}
                ref={gameAreaRef}
              />
              
              {/* Render Players */}
              {gameState.players.map(player => (
                <Player
                  key={player.id}
                  player={player}
                  onClick={() => selectPlayer(player.id)}
                  isAnimating={gameState.isPlaying}
                />
              ))}
              
              {/* Render Ball */}
              <Ball 
                position={gameState.ball}
                isAnimating={gameState.isPlaying}
              />
            </div>
          </div>

          {/* Score Board */}
          <div className="lg:col-span-1">
            <ScoreBoard
              score={gameState.score}
              gameTime={gameState.gameTime}
              isPlaying={gameState.isPlaying}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-3">🎮 How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">1. Select Player</p>
              <p className="text-emerald-200">Click on any player to select them</p>
            </div>
            <div>
              <p className="font-semibold mb-1">2. Move & Pass</p>
              <p className="text-emerald-200">Click on the field to move selected player</p>
            </div>
            <div>
              <p className="font-semibold mb-1">3. Score Goals</p>
              <p className="text-emerald-200">Get the ball into the opponent's goal!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};