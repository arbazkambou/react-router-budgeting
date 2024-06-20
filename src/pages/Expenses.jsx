import { ExpenseTable } from "@/components/ExpensesTable";
import { deleteExpense, getData, waitt } from "@/helper";
import toast from "react-hot-toast";
import { redirect, useLoaderData } from "react-router-dom";

export function expensesLoader() {
  const expenses = getData({ key: "expenses" });
  const budgets = getData({ key: "budgets" });
  return { expenses, budgets };
}

export async function expensesAction({ request }) {
  await waitt();
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const { _action, ...values } = formData;
  if (_action === "deleteExpense") {
    try {
      deleteExpense({ key: "expenses" }, values.id);

      toast.success(`Expense ${values.name} deleted`);

      return redirect("/expenses");
    } catch {
      throw new Error("There was an error while deleting expense");
    }
  }
}

function Expenses() {
  const { expenses, budgets } = useLoaderData();
  return (
    <ExpenseTable
      type="full"
      expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
      budgets={budgets}
    />
  );
}

export default Expenses;
