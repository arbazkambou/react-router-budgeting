import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { getData } from "@/helper";
import { Home } from "lucide-react";
import { Link, Outlet, useLoaderData } from "react-router-dom";

export function mainLoader() {
  return getData({ key: "userName" });
}

function Main() {
  const userName = useLoaderData();

  return (
    <div className=" mx-5 my-5 ">
      <nav className=" flex justify-between sm:mx-6">
        {userName && (
          <>
            <Link to={"/"} className=" flex justify-center">
              <Home className=" size-10 text-violet-600" />
              &nbsp;{" "}
              <span className="mt-2 text-lg font-bold text-violet-600">
                Home
              </span>
            </Link>
            <ConfirmDialog>
              <Button className=" bg-red-600 hover:bg-red-400" type="submit">
                Delete user
              </Button>
            </ConfirmDialog>
          </>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Main;
