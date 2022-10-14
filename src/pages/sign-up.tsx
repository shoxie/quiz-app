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
import axios from 'axios'

const validationSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters or more."),
});

type User = {
  email: string;
  name: string;
  password: string;
};

export default function SignUpPage() {
  function onSubmitHandler(data: User) {
    axios.post('/api/user/create', data).then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
    <Container maxW="xl" height="100vh">
      <HStack justify="center" align="center" h="full">
        <Box>
          <Heading textAlign="center" mb="5">
            Create your account to start playing !
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
                  <FormControl id="name" isInvalid={!!errors.name}>
                    <FormLabel>Your name</FormLabel>

                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
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

                  <Button type="submit" mt="5">
                    go
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </HStack>
    </Container>
  );
}
