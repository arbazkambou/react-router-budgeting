import { AddExpenseForm } from "@/components/AddExpenseForm";
import BudgetItem from "@/components/BudgetItem";
import { CreateBudgetForm } from "@/components/CreateBudgetForm";
import { ExpenseTable } from "@/components/ExpensesTable";
import Intro from "@/components/Intro";
import {
  createBudget,
  createExpense,
  createUser,
  deleteExpense,
  getData,
  waitt,
} from "@/helper";
import toast from "react-hot-toast";
import { redirect, useLoaderData } from "react-router-dom";

export function dashboardLoader() {
  const userName = getData({ key: "userName" });
  const budgets = getData({ key: "budgets" });
  const expenses = getData({ key: "expenses" });
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  await waitt();
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const { _action, ...values } = formData;

  if (_action === "createUser") {
    try {
      createUser(values.userName);
      toast.success(`Welcome, ${values.userName}`);
      return redirect("/");
    } catch {
      throw new Error("There was an error while creating user");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      toast.success(`New budget, ${values.newBudget} created`);
      return redirect("/");
    } catch {
      throw new Error("There was an error while creating user");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      toast.success(`New Expense, ${values.newExpense} created`);

      return redirect("/");
    } catch {
      throw new Error("There was an error while creating expense");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteExpense({ key: "expenses" }, values.id);

      toast.success(`Expense ${values.name} deleted`);

      return redirect("/");
    } catch {
      throw new Error("There was an error while deleting expense");
    }
  }
}
function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();

  return userName ? (
    <div className=" mt-10">
      <h1 className=" text-3xl text-center font-semibold ">
        Welcome Back, <span className=" text-violet-700">{userName}</span>
      </h1>
      <div className=" flex justify-center mt-2">
        <hr className=" sm:w-[30%] w-[50%] border-4 border-violet-600 rounded-md" />
      </div>

      <div
        className={` md:grid ${
          budgets?.length > 0 && "md:grid-cols-2"
        } md:gap-x-8 md:mx-5`}
      >
        <CreateBudgetForm />

        {budgets?.length > 0 && <AddExpenseForm budgets={budgets} />}
      </div>

      {budgets?.length > 0 && expenses?.length > 0 && (
        <p className="ml-5 text-lg font-semibold mt-5">Existing Budgets</p>
      )}

      <div className="grid sm:grid-cols-2 gap-8 grid-col-1 mt-5 md:mx-5">
        {budgets?.length > 0 &&
          expenses?.length > 0 &&
          budgets?.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))}
      </div>
      <div className=" md:mx-5">
        {expenses?.length > 0 && (
          <ExpenseTable
            expenses={expenses
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, 5)}
            type="limited"
            budgets={budgets}
          />
        )}
      </div>
    </div>
  ) : (
    <Intro />
  );
}

export default Dashboard;
