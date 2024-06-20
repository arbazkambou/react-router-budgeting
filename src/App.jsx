import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { logoutAction } from "./actions/logout";
import { Toaster } from "react-hot-toast";
import Expenses, { expensesAction, expensesLoader } from "./pages/Expenses";
import Budget, { budgetAction, budgetLoader } from "./pages/Budget";
import { deleteBudget } from "./actions/deleteBudget";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    loader: mainLoader,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "/logout",
        element: <p>logout</p>,
        action: logoutAction,
      },
      {
        path: "expenses",
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: budgetLoader,
        action: budgetAction,
        children: [
          {
            path: "delete",
            element: <p>hh</p>,
            action: deleteBudget,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder="false" />
    </>
  );
}

export default App;
