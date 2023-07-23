import { createBrowserRouter } from "react-router-dom";
import CodeIde from "./components/CodeIde";
import Layout from "./components/Layout";
import Login from "./components/Login";
import ProblemsList from "./components/ProblemsList";
import Signup from "./components/Signup";
import ProblemIndividual from "./components/ProblemIndividual";
import SubmissionsList from "./components/SubmissionsList";

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
            {
                path: "problems/p/:id",
                element: <ProblemIndividual />,
            },
            {
                path: "submissions",
                element: <SubmissionsList />,
            },
        ],
    },
]);

export default router;
