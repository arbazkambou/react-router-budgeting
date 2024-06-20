import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

export function SelectCategory({ budgets }) {
  return (
    <>
      <Label htmlFor="category">Select Category</Label>
      <Select id="newExpenseBudget" name="newExpenseBudget" required>
        <SelectTrigger className=" w-[30%]">
          <SelectValue placeholder={budgets[0].name} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Budgets</SelectLabel>
            {budgets
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((budget) => (
                <SelectItem key={budget.id} value={budget.id}>
                  {budget.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
