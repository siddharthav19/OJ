import {
    Box,
    Button,
    FormLabel,
    HStack,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
    password: z.string().min(3, {
        message: "Password Must be atleast 3 or more characters",
    }),
    email: z
        .string()
        .min(5, {
            message: "Email must be atleast 5 or more characters",
        })
        .email({
            message: "Not a valid email",
        }),
});

type formDataType = z.infer<typeof schema>;

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formDataType>({ resolver: zodResolver(schema) });
    const navigate = useNavigate();
    const onSubmit = (value: FieldValues) => {
        console.log(value);
        navigate("/");
    };
    return (
        <HStack justifyContent={"center"} mt={"15"} p={"10"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack width={"50%"} minWidth={"360px"}>
                    <Box>
                        <FormLabel htmlFor="email" fontSize={"lg"}>
                            Email
                        </FormLabel>
                        <Input
                            padding={"6"}
                            id="email"
                            placeholder="email"
                            type="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <Text mt="2" p={"1"} color={"red.300"}>
                                {errors.email.message}
                            </Text>
                        )}
                    </Box>
                    <Box>
                        <FormLabel htmlFor="password" fontSize={"lg"}>
                            Password
                        </FormLabel>
                        <Input
                            id="password"
                            padding={"6"}
                            placeholder="password"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <Text mt="2" p={"1"} color={"red.300"}>
                                {errors.password.message}
                            </Text>
                        )}
                    </Box>
                    <Button mt={"2"} colorScheme="teal" type={"submit"}>
                        Submit
                    </Button>
                </Stack>
            </form>
        </HStack>
    );
};

export default Login;
