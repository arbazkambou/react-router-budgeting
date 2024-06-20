import { deleteItem, waitt } from "@/helper";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

export async function deleteBudget({ params, request }) {
  await waitt();
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const { budgetName } = formData;

  deleteItem({ key: "budgets" }, params.id);
  toast.success(`Budget ${budgetName} deleted`);
  return redirect("/");
}
