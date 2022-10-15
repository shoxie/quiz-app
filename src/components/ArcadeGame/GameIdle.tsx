import { GameIdleProps } from "@/types/arcade-game";
import { Heading, Button, Text, Box } from "@chakra-ui/react";

export default function GameIdle(props: GameIdleProps) {
    return (
      <Box transitionDuration="500" transition="all">
        <Heading>Practice yourself</Heading>
        <Text>Take our quiz on random category</Text>
        <Button onClick={() => props.setGameState("started")}>Start</Button>
      </Box>
    );
  }
  