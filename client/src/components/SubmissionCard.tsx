import { Box, Code, Stack, Textarea } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

interface SubmissionDetail {
    problemSubmission: {
        verdict: string;
        code: string;
    };
}

const SubmissionCard = () => {
    const { submissionId } = useParams();
    const token = localStorage.getItem("userToken");
    const submissionQueryMounted = useQuery<SubmissionDetail, Error>({
        queryKey: ["submissions", submissionId],
        queryFn: () =>
            axios
                .get<SubmissionDetail>(
                    `http://localhost:3036/api/problems/submissions/${submissionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => res.data),
        staleTime: Infinity,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
    return (
        <Stack direction="row">
            <Box></Box>

            <Textarea
                resize={"none"}
                color="green.200"
                readOnly={true}
                height={"90vh"}
                value={submissionQueryMounted.data?.problemSubmission.code}
            ></Textarea>
        </Stack>
    );
};

export default SubmissionCard;
