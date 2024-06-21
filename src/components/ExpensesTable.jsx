import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateTotalSpent, formatCurrency, formatDate } from "@/helper";
import { Button } from "./ui/button";
import { Link, useFetcher } from "react-router-dom";

export function ExpenseTable({ expenses, type, budgets }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const totalSpent = calculateTotalSpent(expenses);
  return (
    <div className="mt-5">
      {type === "limited" && (
        <h1 className="mb-2 ml-5 text-lg font-semibold">Recent Expenses</h1>
      )}
      {type === "specific" && (
        <h1 className="mb-2 ml-5 text-lg font-semibold">
          <span className=" text-violet-600">{budgets[0].name}</span> Expenses
        </h1>
      )}
      {type === "full" && (
        <h1 className="mb-2 ml-2 text-3xl mt-10 font-semibold">
          All Expenses <span></span>
        </h1>
      )}

      {expenses?.length > 0 ? (
        <Table>
          {type === "limited" && (
            <TableCaption className=" text-start ml-2">
              <Button variant="outline" disabled={isSubmitting}>
                <Link to="expenses">View All Expenses</Link>
              </Button>
            </TableCaption>
          )}

          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              {type !== "specific" && <TableHead>Budget</TableHead>}
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{formatDate(expense.createdAt)}</TableCell>
                <TableCell>{expense.name}</TableCell>

                {type !== "specific" && (
                  <TableCell>
                    <Button
                      variant="outline"
                      className=" hover:bg-violet-100 hover:text-stone-600 text-xs font-normal bg-violet-200"
                      disabled={isSubmitting}
                    >
                      {budgets
                        .filter((budget) => budget.id === expense.budgetId)
                        .map((budget) => (
                          <Link to={`/budget/${budget.id}`} key={budget.id}>
                            {budget.name}
                          </Link>
                        ))}
                    </Button>
                  </TableCell>
                )}

                <TableCell>{formatCurrency(expense.amount)}</TableCell>
                <TableCell>
                  <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="name" value={expense.name} />
                    <input type="hidden" name="id" value={expense.id} />
                    <Button
                      variant="outline"
                      className="  hover:bg-red-100 hover:text-stone-600 text-xs font-normal bg-red-200"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Delete
                    </Button>
                  </fetcher.Form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {type !== "limited" && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={type === "specific" ? 2 : 3}>
                  Total
                </TableCell>
                <TableCell colSpan={3}>{formatCurrency(totalSpent)}</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      ) : (
        <p className=" text-xl font-semibold">No expense to show</p>
      )}
    </div>
  );
}
