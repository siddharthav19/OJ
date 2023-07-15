import { Box, HStack, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
    const { colorMode } = useColorMode();
    return (
        <HStack
            padding={"20px"}
            justifyContent={"space-between"}
            fontSize={"large"}
            backgroundColor={"facebook.400"}
        >
            <HStack>
                <Link to={"/"}>Home</Link>
            </HStack>
            <HStack spacing={"10"}>
                <Box>
                    <Link to={"/problems"}>Problems</Link>
                </Box>
                <Box>
                    <Link to={"/ide"}>Online IDE</Link>
                </Box>
                <Box>
                    <Link to={"/submissions"}>Submissions</Link>
                </Box>
            </HStack>
            <HStack spacing={"4"}>
                <Link to={"/login"}>Login</Link>
                <ColorModeSwitch />
            </HStack>
        </HStack>
    );
};

export default NavBar;
