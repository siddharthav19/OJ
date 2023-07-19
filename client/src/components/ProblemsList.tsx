import {
    Box,
    CircularProgress,
    Stack,
    Table,
    TableContainer,
    Text,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AError, AllProblems } from "../services/externalNetworkReq";
import { Link } from "react-router-dom";

const ProblemsList = () => {
    const problemsQuery = useQuery<AllProblems, AError>({
        queryKey: ["problems"],
        queryFn: () =>
            axios
                .get<AllProblems>("http://localhost:3036/api/problems/")
                .then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000,
    });
    if (problemsQuery.error)
        return (
            <Stack width={"86%"} alignItems={"center"} py="10" mt="10">
                <Text fontSize={"lg"} textColor={"red.300"}>
                    {problemsQuery.error.response.data.message
                        ? problemsQuery.error.response.data.message
                        : `Unable to get the problems please try again!`}
                </Text>
            </Stack>
        );

    return (
        <Stack width={"100%"} alignItems={"center"} mt="10" pl="10">
            <Box width={"80%"}>
                {problemsQuery.isLoading ? (
                    <Stack width={"86%"} alignItems={"center"} py="10" mt="10">
                        <CircularProgress
                            isIndeterminate
                            color="green.400"
                            thickness={"6"}
                            size={"20"}
                        />
                    </Stack>
                ) : (
                    <TableContainer>
                        <Table variant="unstyled" size={"lg"}>
                            <Thead>
                                <Tr>
                                    <Th>NO</Th>
                                    <Th>Problem</Th>
                                    <Th>Diffficulty</Th>
                                    <Th>submissions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {problemsQuery.data?.result.problems.map(
                                    (currentProblem, index) => (
                                        <Tr>
                                            <Td fontSize={"lg"}>{index + 1}</Td>
                                            <Td
                                                color={"linkedin.600"}
                                                cursor={"pointer"}
                                                fontSize={"lg"}
                                            >
                                                <Link
                                                    to={`/problems/${currentProblem._id}`}
                                                >
                                                    {currentProblem.name}
                                                </Link>
                                            </Td>
                                            <Td fontSize={"md"}>
                                                {currentProblem.difficulty.toUpperCase()}
                                            </Td>
                                            <Td fontSize={"md"}>
                                                {
                                                    currentProblem.submissionsCount
                                                }
                                            </Td>
                                        </Tr>
                                    )
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Stack>
    );
};

export default ProblemsList;
