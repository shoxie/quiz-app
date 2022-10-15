import type { NextPage } from "next";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbBrandAppleArcade } from "react-icons/tb";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useNoti } from "@/contexts/notifications";
import { PRIVATE_ROUTES } from "@/app/router";

const Home: NextPage = () => {
  const { status } = useSession()
  const { addNoti } = useNoti()
  useEffect(() => {
    Router.events.on("routeChangeStart", (route: string) => {
      if (status === "unauthenticated" && PRIVATE_ROUTES.includes(route)) {
        addNoti("You're not signed in", "Please sign in first before playing.", "error", "Sign in now", () => Router.push("/sign-in"))
        return false
      }
      return true
    })
  })
  return (
    <Container maxW={"container.xl"}>
      <Box textAlign={"center"}>
        <Heading>Welcome to Trivia App!</Heading>
        <Text>
          Join us into the Trivia World, with your friend. Or you can challenge
          yourself. Below are available games
        </Text>
      </Box>
      <SimpleGrid pt="5">
        <Link href="/arcade">
          <VStack align="center" title="Play on your own" cursor="pointer">
            <Box rounded="full" border="2px" borderColor="black" p="5">
              <TbBrandAppleArcade size={60} />
            </Box>
            <Text>Arcade mode</Text>
          </VStack>
        </Link>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
