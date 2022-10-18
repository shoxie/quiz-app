import type { NextPage } from "next";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Router from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useNoti } from "@/contexts/notifications";
import { PRIVATE_ROUTES } from "@/app/router";
import MyQuizes from "@/components/Quizes/GameListing";
import QuizHistoryWrapper from "@/components/Quizes/History";

const Home: NextPage = () => {
  const { status } = useSession();
  const { addNoti } = useNoti();

  useEffect(() => {
    Router.events.on("routeChangeStart", (route: string) => {
      if (status === "unauthenticated" && PRIVATE_ROUTES.includes(route)) {
        addNoti(
          "You're not signed in",
          "Please sign in first before playing.",
          "error",
          "Sign in now",
          () => Router.push("/sign-in")
        );
        return false;
      }
      return true;
    });
  });

  return (
    <Container maxW={"container.xl"}>
      <VStack spacing={10} align="start">
      <MyQuizes />
      <QuizHistoryWrapper />
      </VStack>
    </Container>
  );
};

export default Home;
