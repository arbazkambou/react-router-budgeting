import { AddExpenseForm } from "@/components/AddExpenseForm";
import BudgetItem from "@/components/BudgetItem";
import { ExpenseTable } from "@/components/ExpensesTable";
import {
  createExpense,
  deleteExpense,
  getBudget,
  getExpensesBelongToBudget,
  waitt,
} from "@/helper";
import toast from "react-hot-toast";
import { redirect, useLoaderData } from "react-router-dom";

export async function budgetLoader({ params }) {
  const { id: budgetId } = params;

  const budget = getBudget({ key: "budgets" }, budgetId);
  const expenses = getExpensesBelongToBudget({ key: "expenses" }, budgetId);

  return { budget, expenses };
}

export async function budgetAction({ request, params }) {
  await waitt();

  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const { _action, ...values } = formData;

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      toast.success(`New Expense, ${values.newExpense} created`);

      return redirect(`/budget/${params.id}`);
    } catch {
      throw new Error("There was an error while creating expense");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteExpense({ key: "expenses" }, values.id);

      toast.success(`Expense, ${values.name} deleted`);

      return redirect(`/budget/${params.id}`);
    } catch {
      throw new Error("There was an error while deleting expense");
    }
  }
}

function Budget() {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="">
      <p className=" text-2xl font-semibold mt-8 mb-5 text-center">
        <span className=" text-violet-600">{budget.name}</span> Overview
      </p>

      <BudgetItem budget={budget} showDeleteButton={true} />

      <AddExpenseForm budgets={[budget]} />

      <ExpenseTable expenses={expenses} budgets={[budget]} type="specific" />
    </div>
  );
}

export default Budget;
