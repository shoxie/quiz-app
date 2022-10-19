import { Container, VStack, Box } from "@chakra-ui/react";

export default function QuizSkeleton() {
    return (
        <Container maxW="container.xl">
            <VStack>
                <Box bg="gray.400" />
            </VStack>
        </Container>
    )
}