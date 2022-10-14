import type { NextPage } from "next";
import { Text, Box } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <Box transitionDuration="500" transition="all">
      <Text onClick={toggleColorMode}>Hello</Text>
    </Box>
  );
};

export default Home;
