import {
    Box,
    Button,
    CircularProgress,
    FocusLock,
    HStack,
    Select,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { AError, Problem } from "../services/externalNetworkReq";
import useAuthContext from "../context/useAuthContext";
import { useForm } from "react-hook-form";

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

const ProblemIndividual = () => {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm<FormData>();
    const onSubmit = (e: FormData) => {
        console.log(e);
    };
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
    });
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
    return (
        <Stack mt="2" p="6">
            <SimpleGrid minChildWidth={"550px"} spacing={"6"}>
                <Stack>
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"medium"}
                        textColor={"teal.200"}
                    >
                        {problemQuery.data?.result.problem.name}
                    </Text>
                    <Text fontSize={"lg"} fontWeight={"normal"}>
                        {problemQuery.data?.result.problem.description}
                    </Text>
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
