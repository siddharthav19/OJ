import { Box, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import useAuthContext from "../context/useAuthContext";

const NavBar = () => {
    const { token, dispatch } = useAuthContext();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("userToken");
    };
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
                {!token ? (
                    <>
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/signup"}>Signup</Link>
                    </>
                ) : (
                    <Button
                        mr={"6"}
                        fontSize={"lg"}
                        colorScheme="green"
                        variant={"outline"}
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Button>
                )}
                <ColorModeSwitch />
            </HStack>
        </HStack>
    );
};

export default NavBar;
