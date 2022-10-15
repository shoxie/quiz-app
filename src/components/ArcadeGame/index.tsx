import {
    GameState
} from "@/types/arcade-game";
import {
    Container
} from "@chakra-ui/react";
import { useState } from "react";
import GameIdle from "./GameIdle";
import GameStarted from "./GameStarted";


export default function ArcadeGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [result, setResult] = useState<boolean[]>([])
  return (
    <Container maxW="container.xl">
      {gameState === "idle" && <GameIdle setGameState={setGameState} />}
      {gameState === "started" && (
        <GameStarted gameState={gameState} setGameState={setGameState} onResult={(result: boolean[]) => setResult(result)} />
      )}
    </Container>
  );
}
