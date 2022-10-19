import { getQuizes } from "@/app/api";
import { Heading, HStack, Box, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quiz } from "@/types/api-response";
import Link from "next/link";

export default function MyQuizes() {
  const { isLoading, error, data, isFetching } = useQuery(
    ["getQuizes"],
    getQuizes
  );

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);

  if (isLoading) return <Box>Loading</Box>;

  if (error) return <Box>{"An error has occurred: " + error}</Box>;
  return (
    <Box>
      <Heading>My Quizes</Heading>
      <Box mt={5}>
        <HStack spacing="5">
          {data.map((item: Quiz, index: number) => (
            <Link key={index} href={`/quiz/${item.id}`} as={`/quiz/${item.id}`}>
              <Box
                boxShadow="2xl"
                roundedBottom="2xl"
                roundedTop="2xl"
                _hover={{
                  boxShadow: "dark-lg",
                }}
                transition="all 200ms ease-in-out"
                cursor="pointer"
              >
                <Image
                  roundedTop="2xl"
                  src={item.image}
                  width="96"
                  h="56"
                  alt={item.title}
                />
                <Box bgColor="white" p="5" roundedBottom="2xl">
                  <Text>{item.title}</Text>
                  <Text>
                    {item.category.title} • {item._count.quizes} questions
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
