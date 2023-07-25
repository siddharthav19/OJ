import {
    Box,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiCodeAlt } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import {
    getTimeElapsed,
    submissionsInterface,
} from "../services/externalNetworkReq";

const SubmissionsList = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return <Navigate to={"/"} />;
    const submissionQuery = useQuery<submissionsInterface, Error>({
        queryKey: ["submissions"],
        queryFn: () =>
            axios
                .get<submissionsInterface>(
                    "http://localhost:3036/api/problems/submissions",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => res.data),
        staleTime: Infinity,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    return (
        <Stack
            p="6"
            m="1"
            justifyContent={"center"}
            alignItems={"center"}
            spacing={"3"}
        >
            <TableContainer width={"90%"}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th fontSize={"md"}>No</Th>
                            <Th fontSize={"md"}>Problem</Th>
                            <Th fontSize={"md"}>Time</Th>
                            <Th fontSize={"md"}>Verdict</Th>
                            <Th fontSize={"md"}>View Code</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {submissionQuery.data?.submissions.map((el, ind) => (
                            <Tr key={el._id}>
                                <Td fontSize={"lg"}>{ind + 1}</Td>
                                <Td
                                    fontSize={"lg"}
                                    color={"messenger.300"}
                                    fontFamily={"mono"}
                                >
                                    <Link to={`/problems/p/${el.problem.id}`}>
                                        {el.problem.name}
                                    </Link>
                                </Td>
                                <Td
                                    fontSize={"medium"}
                                    color={"red.300"}
                                    fontFamily={"mono"}
                                >
                                    {getTimeElapsed(el.submittedAt)}
                                </Td>
                                <Td
                                    fontSize={"sm"}
                                    fontFamily={"mono"}
                                    color={
                                        el.verdict[0] == "A"
                                            ? "green.200"
                                            : "red.400"
                                    }
                                >
                                    {el.verdict}
                                </Td>
                                <Td fontSize={"3xl"} color={"teal.300"}>
                                    <Link
                                        to={`/submissions/${el._id}`}
                                        aria-label="link"
                                        target="_blank"
                                    >
                                        <BiCodeAlt />
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default SubmissionsList;
