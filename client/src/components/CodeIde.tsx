import {
    Box,
    Button,
    CircularProgress,
    HStack,
    Select,
    Stack,
    Textarea,
    useColorMode,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    language: string;
    code: string;
    input: string;
    evalType?: string;
};

interface executionResult {
    status: string;
    data: {
        output: string;
        compilation: string;
        message?: string;
    };
}

interface CompilerEvalError extends Error {
    response: {
        status: string;
        data: {
            output: string;
            compilation: string;
            message?: {
                fullmessage: string;
            };
        };
    };
}

const CodeIde = () => {
    const { colorMode } = useColorMode();
    const fn = (codeBundle: FormData) =>
        axios
            .post<executionResult>(
                "http://localhost:3036/api/compiler",
                codeBundle
            )
            .then((res) => res.data);

    const executeCode = useMutation<
        executionResult,
        CompilerEvalError,
        FormData
    >({
        mutationFn: (formData: FormData) => fn(formData),
    });

    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        await executeCode.mutate(data);
    };
    return (
        <Stack>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Stack padding={"30px"} spacing={"10px"}>
                    <Box>
                        <Select
                            fontFamily={`monospace`}
                            border={"2px"}
                            colorScheme="black"
                            borderColor={"gray.700"}
                            width={"150px"}
                            defaultValue={"cpp"}
                            {...register("language")}
                        >
                            <option value="cpp">C++ 17</option>
                            <option value="py">Python</option>
                            <option value="java">Java</option>
                        </Select>
                    </Box>
                    <Box>
                        <Textarea
                            fontFamily={`mono`}
                            borderRadius={"5"}
                            focusBorderColor="gray.500"
                            height={"70vh"}
                            border={"2px"}
                            width={"90%"}
                            colorScheme="black"
                            whiteSpace={"pre-wrap"}
                            placeholder="code here"
                            size="sm"
                            defaultValue={""}
                            resize={"none"}
                            textColor={
                                colorMode === "dark"
                                    ? "blue.200"
                                    : "blackAlpha.800"
                            }
                            {...register("code")}
                        />
                    </Box>

                    <Box>
                        <Textarea
                            fontFamily={`mono`}
                            borderRadius={"5"}
                            focusBorderColor="gray.300"
                            height={"10vh"}
                            border={"2px"}
                            width={"90%"}
                            colorScheme="black"
                            whiteSpace={"pre-wrap"}
                            placeholder="input here"
                            size="sm"
                            defaultValue={""}
                            resize={"none"}
                            {...register("input")}
                        />
                    </Box>
                    <Button
                        width={"100px"}
                        mt={4}
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>
            </form>

            {executeCode.isLoading && (
                <HStack ml={"10"} mb={"3"} flexDir={"row"} spacing={"3"}>
                    <CircularProgress isIndeterminate color="black" size="10" />
                    <Text fontSize={"xl"}>Compiling ... </Text>
                </HStack>
            )}

            {executeCode.error ? (
                <Box
                    maxW={"85%"}
                    justifyContent={"center"}
                    ml={"8"}
                    mb={"5"}
                    height={"50px"}
                    bg={"teal.300"}
                    padding={"5px 20px"}
                    borderRadius={"5"}
                >
                    {"Error"}
                </Box>
            ) : (
                <Box
                    maxW={"85%"}
                    justifyContent={"center"}
                    ml={"8"}
                    mb={"5"}
                    height={"50px"}
                    bg={"teal.300"}
                    padding={"5px 20px"}
                    borderRadius={"5"}
                    whiteSpace={"pre-wrap"}
                    boxSize={"auto"}
                >
                    {executeCode.data?.data.output}
                </Box>
            )}
        </Stack>
    );
};

export default CodeIde;
