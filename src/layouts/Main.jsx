import { ChooseThemeMenu } from "@/components/ChooseThemeMenu";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { getData } from "@/helper";
import { Home, UserRoundX } from "lucide-react";
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
              <Home className=" sm:size-10 size-8 text-green-500" />
              &nbsp;{" "}
              <span className="mt-2 text-lg sm:font-bold font-semibold text-green-500">
                HomeBudget
              </span>
            </Link>
            <ChooseThemeMenu />
            <ConfirmDialog>
              {/* <Button className=" bg-red-600 hover:bg-red-400" type="submit">
                Delete user
              </Button> */}
              <Link className=" flex justify-center">
                <UserRoundX className=" sm:size-10 size-8 text-red-500" />
                &nbsp;{" "}
                <span className="mt-2 text-lg sm:font-bold font-semibold text-red-500">
                  Delete User
                </span>
              </Link>
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
