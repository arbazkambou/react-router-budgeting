import { deleteItem } from "@/helper";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

export async function logoutAction() {
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });
  toast.success("User successfully deleted!");
  return redirect("/");
}
