import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (
        <Grid
            templateAreas={`"nav nav" "main main"`}
            gap={"2"}
            gridTemplateRows={"60px 1fr"}
            gridTemplateColumns={"auto"}
            width={"full"}
        >
            <GridItem area={"nav"} bgColor={""}>
                <NavBar />
            </GridItem>
            <GridItem area={"main"}>
                <Outlet />
            </GridItem>
        </Grid>
    );
};

export default Layout;
