import { Box, Stack, Text } from "@chakra-ui/react";

const SubmissionsList = () => {
    return (
        <Stack p="1" m="2" justifyContent={"center"} alignItems={"center"}>
            <Box>
                <Text fontSize={"lg"}>Your Submissions</Text>
            </Box>
        </Stack>
    );
};

export default SubmissionsList;
