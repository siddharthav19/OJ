import {
    Box,
    Button,
    FocusLock,
    Input,
    Select,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormData = {
    language: string;
    code: string;
};

const CodeIde = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    return (
        <Stack>
            <form
                onSubmit={handleSubmit((e) => console.log(e))}
                autoComplete="off"
            >
                <Stack padding={"30px"} spacing={"10px"}>
                    <Box>
                        <Select
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
                        <FocusLock isDisabled={false}>
                            <Textarea
                                borderRadius={"5"}
                                focusBorderColor="gray.300"
                                height={"70vh"}
                                border={"2px"}
                                width={"90%"}
                                colorScheme="black"
                                whiteSpace={"pre-wrap"}
                                placeholder="code here"
                                size="sm"
                                defaultValue={""}
                                resize={"none"}
                                {...register("code")}
                            />
                        </FocusLock>
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
            <Box></Box>
        </Stack>
    );
};

export default CodeIde;
