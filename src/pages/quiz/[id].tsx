import { getQuiz } from "@/app/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Question from "@/components/Quizes/Question";
import { GameState, TAnswerSheet, TQuestion } from "@/types/quiz-game";
import { saveHistory } from "@/app/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Container,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { shuffle } from "@/utils";
import { useSession } from "next-auth/react";

export default function QuizPanel({ id }: { id: string }) {
  const { status, data: session } = useSession();
  const { isLoading, error, data, isFetching } = useQuery(
    ["getHistory", id],
    async () => await getQuiz(id)
  );

  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion>({
    answer: [""],
    category: "",
    correct_answer: "",
    point: 0,
    question: "",
    type: "",
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [answerSheet, setAnswerSheet] = useState<TAnswerSheet[]>([]);
  const [gameState, setGameState] = useState<GameState>("started");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!data) return;
    setQuestions(shuffle(data.quizes));
    setCurrentQuestion(data.quizes[0]);
  }, [data, error]);

  function navigate(direction: string) {
    switch (direction) {
      case "next":
        setActiveIndex((prev) => prev + 1);
        setCurrentQuestion(questions[activeIndex + 1]);
        break;
      case "prev":
        setActiveIndex((prev) => prev - 1);
        setCurrentQuestion(questions[activeIndex - 1]);
        break;
    }
  }

  function handleAnswerClick(answer: string) {
    let temp = [...answerSheet];
    (temp[activeIndex] = {
      question: currentQuestion,
      choosen: answer,
    }),
      setAnswerSheet(temp);
  }

  async function handleFinishGame() {
    let totalPoint = 0;

    for (let i = 0; i < answerSheet.length; i++) {
      let item = answerSheet[i];
      if (item.choosen === item.question.correct_answer) {
        totalPoint = totalPoint + item.question.point;
      }
    }

    if (!session?.user?.id) return

    saveHistory(new Date(), id, totalPoint, session?.user?.id);
    onOpen();
  }

  function getCorrectAnswersLength() {
    let total = 0;

    for (let i = 0; i < answerSheet.length; i++) {
      let item = answerSheet[i];
      if (item.choosen === item.question.correct_answer) total++;
    }
    return total;
  }

  function reDo() {
    onClose();
    setAnswerSheet([]);
    setActiveIndex(0);
    setQuestions(shuffle(questions));
  }

  if (status === "unauthenticated")
    return <Box>You&apos;re not authenticated</Box>;

  if (isLoading) return <Box>Loading</Box>;

  if (error) return <Box>{"An error has occurred: " + error}</Box>;

  return (
    <Container maxW="container.xl">
      <HStack justify="space-between">
        <Box>
          {activeIndex > 0 && (
            <Button onClick={() => navigate("prev")}>Back</Button>
          )}
        </Box>
        <Box>
          {activeIndex < questions.length - 1 && (
            <Button onClick={() => navigate("next")}>Next</Button>
          )}
          {activeIndex === questions.length - 1 && (
            <Button onClick={handleFinishGame}>Finish</Button>
          )}
        </Box>
      </HStack>

      <Question
        category={currentQuestion.type}
        correct_answer={currentQuestion.correct_answer}
        difficulty={data?.category.title ?? ""}
        answer={currentQuestion.answer}
        question={currentQuestion.question}
        type={currentQuestion.type}
        onAnswerSelect={(answer: string) => handleAnswerClick(answer)}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congrats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"}>You have finished your quiz.</Text>
            <Text>
              Result: {getCorrectAnswersLength()}/{questions.length}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => reDo()}>
              Do it again ?
            </Button>
            <Link href="/">
              <Button variant="ghost">Do another quiz!</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  return {
    props: {
      id,
    }, // will be passed to the page component as props
  };
};
