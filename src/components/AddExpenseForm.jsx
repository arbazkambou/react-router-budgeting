import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { SelectCategory } from "./SelectCategory";

export function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(
    function () {
      formRef.current.reset();
    },
    [isSubmitting]
  );
  return (
    <Card className="w-[100%] mt-5 border-dotted border-2 hover:border-violet-600 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">
          Add New{" "}
          {budgets?.length === 1 && (
            <span className=" text-violet-700">{budgets[0].name}</span>
          )}{" "}
          Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <fetcher.Form method="post" ref={formRef}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newExpense">Name</Label>
              <Input
                id="newExpense"
                placeholder="e.g. Coffee"
                name="newExpense"
                required
                ref={focusRef}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newExpenseAmount">Amount</Label>
              <Input
                id="newExpenseAmount"
                placeholder="e.g. PKR 560"
                name="newExpenseAmount"
                type="number"
                required
                disabled={isSubmitting}
              />
            </div>

            {budgets?.length > 1 && (
              <div
                className={`flex flex-col space-y-1.5
              `}
              >
                <SelectCategory budgets={budgets} />
              </div>
            )}

            <Input
              type="hidden"
              name="_action"
              value="createExpense"
              required
            />
            {budgets?.length === 1 && (
              <Input
                type="hidden"
                name="newExpenseBudget"
                value={budgets[0].id}
                required
              />
            )}

            <div>
              {isSubmitting ? (
                <Button type="submit" disabled>
                  Creating Expense...
                </Button>
              ) : (
                <Button type="submit">
                  Create Expense &nbsp;
                  <span className=" space-x-5">
                    <ShoppingCart />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </fetcher.Form>
      </CardContent>
    </Card>
  );
}
