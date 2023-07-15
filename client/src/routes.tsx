import { createBrowserRouter } from "react-router-dom";
import CodeIde from "./components/CodeIde";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "ide",
        element: <CodeIde />,
      },
    ],
  },
]);

export default router;
