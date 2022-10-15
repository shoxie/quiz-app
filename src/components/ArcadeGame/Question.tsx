import { QuestionProps } from "@/types/arcade-game";
import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { shuffle } from "@/utils";
import { motion } from "framer-motion";

export default function Question(props: QuestionProps) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setAnswers(shuffle([...props.incorrect_answers, props.correct_answer]));
    setSelected(null)
  }, [props.question]);

  function handleAnswerClick(answer: string, idx: number) {
    props.onAnswerSelect(answer);
    setSelected(idx);
  }

  return (
    <VStack>
      <Heading textAlign={"center"}>{props.question}</Heading>
      <SimpleGrid
        as={motion.div}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            staggerChildren: 1,
            duration: 1.5
          },
        }}
        columns={2}
        spacing={10}
        w="full"
      >
        {answers.map((item, idx) => (
          <Button
            as={motion.button}
            initial={{
                opacity: 0
            }}
            animate={{
              backgroundColor: selected === idx ? "yellow" : "",
              opacity: 1
            }}
            key={idx}
            onClick={() => handleAnswerClick(item, idx)}
          >
            {item}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
