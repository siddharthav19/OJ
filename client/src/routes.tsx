import { createBrowserRouter } from "react-router-dom";
import CodeIde from "./components/CodeIde";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProblemsList from "./components/ProblemsList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "ide",
                element: <CodeIde />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "problems",
                element: <ProblemsList />,
            },
        ],
    },
    {
        path: "/problems/:id",
        element: "",
    },
]);

export default router;
