import { getQuizHistory } from "@/app/api";
import {
  Heading,
  HStack,
  Box,
  Image,
  Text,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { QuizHistory } from "@/types/api-response";
import { motion } from "framer-motion";
import moment from "moment";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export default function QuizHistoryWrapper({ session }: {session?: Session}) {
  const { isLoading, error, data, isFetching } = useQuery(
    ["getHistory", session?.user?.id],
    async () => await getQuizHistory(session?.user?.id ?? "")
  );

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);

  if (isLoading) return <Box>Loading</Box>;

  if (error) return <Box>{"An error has occurred: " + error}</Box>;

  return (
    <Box w="full">
      <Heading>Quiz History</Heading>
      <Box mt={5} w="full">
        <VStack overflowX="auto" w="full">
          {data.map((item: QuizHistory, index: number) => (
            <Box
              key={index}
              as={motion.div}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.3 * index,
                  duration: 0.3,
                },
              }}
              w="full"
              borderBottom="1px"
              borderColor="gray.200"
              py="4"
              boxShadow="none"
              _hover={{
                bgColor: "gray.200"
              }}
              transition="all 200ms ease-in-out"
              mt={0}
            >
              <Grid templateColumns="repeat(12, 1fr)" gap="10" w="full">
                <GridItem colSpan={2} w="full">
                  <Text>{moment(item.startDate).format("MMM Do YYYY")}</Text>
                </GridItem>
                <GridItem colSpan={6} w="full">
                  <Text fontWeight="bold">{item.game.title}</Text>
                </GridItem>
                <GridItem colSpan={2} w="full">
                  <Text>{item.game.category.title}</Text>
                </GridItem>
                <GridItem colSpan={2} w="full">
                  <Text fontWeight={"bold"}>{item.totalPoint} pts</Text>
                </GridItem>
              </Grid>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context)
    }
  }
}