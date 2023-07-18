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
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AError, postResponseUser } from "../services/externalNetworkReq";

const schema = z.object({
    name: z.string().min(3, {
        message: "Name must be atleast 3 characters",
    }),
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

const Signup = () => {
    const signupUser = useMutation<postResponseUser, AError, formDataType>({
        mutationFn: (user: formDataType) =>
            axios
                .post<postResponseUser>(
                    "http://127.0.0.1:3036/api/user/signup",
                    user
                )
                .then((res) => res.data),
        onSuccess: (createdUser, user) => {
            const { token } = createdUser.data;
            localStorage.setItem("userToken", token);
            navigate("/");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formDataType>({ resolver: zodResolver(schema) });
    const navigate = useNavigate();
    const onSubmit = async (value: formDataType) => {
        await signupUser.mutate(value);
    };
    return (
        <HStack justifyContent={"center"} mt={"15"} p={"10"}>
            <Stack
                width={{
                    lg: "460px",
                    sm: "360px",
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <Box>
                            <FormLabel htmlFor="name" fontSize={"lg"}>
                                Name
                            </FormLabel>
                            <Input
                                padding={"6"}
                                id="name"
                                placeholder="Name"
                                {...register("name")}
                            />
                            {errors.name && (
                                <Text mt="2" p={"1"} color={"red.300"}>
                                    {errors.name.message}
                                </Text>
                            )}
                        </Box>
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
                {signupUser.error && (
                    <Box>
                        <Text
                            mt="2"
                            p={"1"}
                            textAlign="center"
                            color={"red.300"}
                        >
                            {signupUser.error.response.data.message}
                        </Text>
                    </Box>
                )}
            </Stack>
        </HStack>
    );
};

export default Signup;
