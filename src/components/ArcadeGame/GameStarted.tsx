import { GameStartedProps, QuestionProps } from "@/types/arcade-game";
import { shuffle } from "@/utils";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import data from "data.json";

export default function GameStarted(props: GameStartedProps) {
    const [question, setQuestion] = useState<QuestionProps | null>(null);
    const [resetCounter, setResetCounter] = useState(true);
    const [answered, setAnswered] = useState<boolean[]>([]);
    const [iteration, setIteration] = useState(0);
  
    useEffect(() => {
      if (!data) return;
      if (iteration === 10) {
        props.setGameState("result")
        props.onResult(answered)
        return
      }
  
      let questions = shuffle(data.results).slice(0, 10);
  
      const timer: ReturnType<typeof setInterval> = setInterval(() => {
        setQuestion(questions[0]);
        questions = [...questions].slice(1, questions.length);
        setResetCounter(true);
        setIteration((prev) => prev + 1);
      }, 10000);
  
      return () => clearInterval(timer);
    });
  
    useEffect(() => {
      if (iteration === 0 && !answered) return;
      if (iteration > answered.length) {
        setAnswered([...answered, false]);
      }
    }, [iteration]);
  
    if (question)
      return (
        <Box>
          <Timer
            resetCounter={resetCounter}
            setResetCounter={setResetCounter}
            iteration={iteration}
          />
          <Question
            {...question}
            onAnswerSelect={(answer: string) =>
              setAnswered([
                ...answered,
                answer === question.correct_answer ? true : false,
              ])
            }
          />
        </Box>
      );
    return null;
  }