import {
  Heading,
  useColorMode,
  Box,
  Button,
  Container,
  HStack,
  Text,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Header() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { status, data } = useSession();

  return (
    <Container maxW="container.xl" py="5">
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
  );
}
