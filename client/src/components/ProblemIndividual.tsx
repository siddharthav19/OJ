import {
    Box,
    Button,
    CircularProgress,
    CircularProgressLabel,
    FocusLock,
    HStack,
    Select,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import useAuthContext from "../context/useAuthContext";
import { AError, Problem } from "../services/externalNetworkReq";

interface individualProblem {
    status: string;
    result: {
        problem: Problem;
    };
}

interface FormData {
    code: string;
    language: string;
    evalType: string;
}

interface submitResult {
    status: string;
}

interface submitError extends Error {
    response: {
        data: {
            status: string;
            message: string;
        };
    };
}

const ProblemIndividual = () => {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm<FormData>();

    const { id } = useParams();
    const token = localStorage.getItem("userToken");
    const { token: t } = useAuthContext();
    if (!(t || token)) return <Navigate to={"/"} />;
    const problemQuery = useQuery<individualProblem, AError>({
        queryKey: ["problem", id],
        queryFn: () =>
            axios
                .get<individualProblem>(
                    `http://localhost:3036/api/problems/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000,
    });

    const submissionQuery = useMutation<submitResult, submitError, FormData>({
        mutationFn: (data: FormData) =>
            axios
                .post<submitResult>(
                    `http://localhost:3036/api/problems/${id}`,
                    {
                        ...data,
                        evalType: "judge",
                    },
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => res.data),
    });
    const onSubmit = async (e: FormData) => {
        console.log(e);
        await submissionQuery.mutate(e);
    };
    if (problemQuery.isLoading)
        return (
            <Stack
                mt="2"
                w={"100%"}
                h="80vh"
                justifyContent={"center"}
                alignItems={"center"}
                pr="20"
                pb="20"
            >
                <Spinner
                    size="xl"
                    color="teal.300"
                    speed="0.46s"
                    label="Loading Please Wait"
                    thickness="3px"
                />
            </Stack>
        );
    console.log(problemQuery.data?.result.problem);
    return (
        <Stack mt="2" p="6">
            <SimpleGrid minChildWidth={"550px"} spacing={"6"}>
                <Stack>
                    <HStack alignItems={"baseline"} spacing={"6"}>
                        <Text
                            fontSize={"2xl"}
                            fontWeight={"medium"}
                            textColor={"teal.300"}
                        >
                            {problemQuery.data?.result.problem.name}
                        </Text>
                        <Text
                            fontSize={"lg"}
                            fontWeight={"medium"}
                            color={"indianred"}
                        >
                            {problemQuery.data?.result.problem.difficulty.toLocaleUpperCase()}
                        </Text>
                    </HStack>
                    <Text
                        fontSize={"lg"}
                        lineHeight={"1.6"}
                        fontWeight={"normal"}
                    >
                        {problemQuery.data?.result.problem.description}
                    </Text>

                    {submissionQuery.isLoading && (
                        <HStack spacing={"5"} pt="2">
                            <CircularProgress
                                color={"orange.400"}
                                isIndeterminate
                                fontSize={"sm"}
                            ></CircularProgress>
                            <Text fontSize={"lg"}>Judging your code </Text>
                        </HStack>
                    )}
                    {submissionQuery.data && (
                        <Box
                            fontSize={"xl"}
                            fontWeight={"medium"}
                            color={
                                submissionQuery.data.status.charAt(0) === "A"
                                    ? "green.300"
                                    : "red.500"
                            }
                        >
                            {submissionQuery.data.status}
                        </Box>
                    )}

                    {submissionQuery.error && (
                        <Box fontSize={"md"} color={"red.500"} pt="2">
                            {
                                "ERROR (check) for compilation errors and memory leaks"
                            }
                        </Box>
                    )}
                </Stack>
                <Stack>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <Stack padding={"1px"} spacing={"10px"}>
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
                                <FocusLock>
                                    <Textarea
                                        fontFamily={`mono`}
                                        borderRadius={"5"}
                                        focusBorderColor="gray.500"
                                        height={"70vh"}
                                        border={"2px"}
                                        width={"100%"}
                                        colorScheme="black"
                                        whiteSpace={"pre-wrap"}
                                        placeholder="code here"
                                        size="sm"
                                        defaultValue={""}
                                        {...register("code")}
                                        resize={"none"}
                                        css={{
                                            "&::-webkit-scrollbar": {
                                                width: "10px",
                                                cursor: "pointer",
                                            },
                                            "&::-webkit-scrollbar-track": {
                                                width: "10px",
                                                cursor: "pointer",
                                            },
                                            "&::-webkit-scrollbar-thumb": {
                                                background: "white",
                                                borderRadius: "10px",
                                            },
                                        }}
                                    />
                                </FocusLock>
                            </Box>

                            <Button
                                width={"100px"}
                                mt={4}
                                colorScheme="teal"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </SimpleGrid>
        </Stack>
    );
};

export default ProblemIndividual;
