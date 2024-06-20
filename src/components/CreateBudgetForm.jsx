import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export function CreateBudgetForm() {
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
        <CardTitle className="text-lg">Create Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <fetcher.Form method="post" ref={formRef}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newBudget">Name</Label>
              <Input
                id="newBudget"
                placeholder="e.g. Groceries"
                name="newBudget"
                required
                ref={focusRef}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newBudgetAmount">Amount</Label>
              <Input
                id="newBudgetAmount"
                placeholder="e.g. PKR 20750"
                name="newBudgetAmount"
                type="number"
                required
                disabled={isSubmitting}
              />
            </div>
            <Input type="hidden" name="_action" value="createBudget" required />
            <div>
              {isSubmitting ? (
                <Button type="submit" disabled>
                  Creating Budget...
                </Button>
              ) : (
                <Button type="submit">
                  Create Budget &nbsp;
                  <span className=" space-x-5">
                    <CircleDollarSign />
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
