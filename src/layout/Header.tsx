import {
  Heading,
  useColorMode,
  Box,
  Button,
  Container,
  HStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Header() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { status, data } = useSession();

  return (
    <Box w="full" position="fixed" py="5">
      <Container
        maxW="container.xl"
        w="full"
        top={0}
        left={0}
        as={motion.div}
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <HStack justify="space-between" width="full">
          <Box>
            <Heading>English Quiz app</Heading>
          </Box>
          <Box>
            <HStack>
              {status === "authenticated" ? (
                <Button onClick={() => signOut()}>
                  <Text>
                    Welcome, <u>{data.user?.name}</u>
                  </Text>
                </Button>
              ) : (
                <Link href="/sign-in">Sign in</Link>
              )}
              <Button variant="unstyled" onClick={toggleColorMode}>
                {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
}
