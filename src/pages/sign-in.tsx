import {
  Box,
  Input,
  FormErrorMessage,
  Button,
  FormControl,
  HStack,
  Container,
  FormLabel,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { z } from "zod";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signIn } from "next-auth/react";
import { useNoti } from "@/contexts/notifications";
import { useRouter } from "next/router";
import Link from "next/link";

const validationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters or more."),
});

type User = {
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter()
  const { addNoti } = useNoti()

  async function onSubmitHandler(data: User) {
    const user = await signIn("credentials", { ...data, callbackUrl: "/", redirect: false})
    console.log(user)
    if (user?.status === 200) {
      addNoti("Signed in", "You will be redirected to homepage", "success", "Redirect now", () => router.push("/"))
    }
  }

  return (
    <Container maxW="xl" height="100vh">
      <HStack justify="center" align="center" h="full">
        <Box>
          <Heading textAlign="center" mb="5">
            Sign into your account !
          </Heading>
          <Formik
            initialValues={{
              email: "",
              password: "",
              name: "",
            }}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={onSubmitHandler}
          >
            {({ values, errors, handleChange }) => (
              <Form>
                <VStack spacing="5">
                  <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel>Email address</FormLabel>

                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl id="password" isInvalid={!!errors.password}>
                    <FormLabel>Your password</FormLabel>

                    <Input
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <HStack align="center" justify="center" spacing="10" mt="5">
                  <Button type="submit">
                    Login
                  </Button>
                  <Button>
                  <Link href="/sign-up">
                    Sign up
                  </Link>
                  </Button>
                  </HStack>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </HStack>
    </Container>
  );
}
