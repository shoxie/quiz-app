import { TimerProps } from "@/types/arcade-game";
import { HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Timer(props: TimerProps) {
    const [counter, setCounter] = useState<number>(10);
  
    useEffect(() => {
      if (props.resetCounter) setCounter(10);
      const counter: ReturnType<typeof setInterval> = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(counter);
        props.setResetCounter(false);
      };
    });
  
    return (
      <HStack justify={"space-between"}>
        <Text>Question: {props.iteration}</Text>
        <Text>Timer: {counter}</Text>
      </HStack>
    );
  }