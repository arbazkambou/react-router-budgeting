import { calculateSpentByBudget, formatCurrency } from "@/helper";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

import { Form, Link } from "react-router-dom";

function BudgetItem({ budget, showDeleteButton = false }) {
  const { amount, name, id } = budget;

  const spent = calculateSpentByBudget(id);
  return (
    <Card className=" text-sm py-2 shadow-md">
      <CardFooter className="flex justify-between">
        <p className=" font-semibold">{name}</p>
        <p className=" flex flex-col">
          <span>{formatCurrency(amount)}</span>
        </p>
      </CardFooter>

      <CardContent>
        <Progress max={amount} value={(spent / amount) * 100} />
      </CardContent>
      <CardFooter className="flex justify-between text-xs">
        <p>{formatCurrency(spent)} spent</p>
        <p>{formatCurrency(amount - spent)} remaining</p>
      </CardFooter>
      <CardFooter>
        {showDeleteButton ? (
          <Form method="post" action="delete">
            <input type="hidden" name="budgetName" value={budget.name} />
            <Button variant="destructive">Delete Budget</Button>
          </Form>
        ) : (
          <Button>
            <Link to={`/budget/${budget.id}`}>View Budget &nbsp;</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default BudgetItem;
