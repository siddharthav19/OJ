import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes";
import { AuthContextProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <RouterProvider router={router} />
                </ChakraProvider>
            </QueryClientProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
