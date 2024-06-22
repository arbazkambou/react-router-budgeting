import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { User } from "lucide-react";
import { useFetcher } from "react-router-dom";

export function CreateUserForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return (
    <Card className="w-[100%] shadow-md py-10">
      <CardHeader>
        <CardTitle className=" font-bold text-3xl">
          Take Control of <span className=" text-green-500">Your Money</span>
        </CardTitle>
        <CardDescription className=" text-lg">
          Personal budgeting is the secret of financial freedom. <br />
          Start your journey today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <fetcher.Form method="post">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                placeholder="What is your name?"
                name="userName"
                disabled={isSubmitting}
                required
              />
            </div>
            <Input type="hidden" name="_action" value="createUser" />
            <div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && "Creating..."}

                {!isSubmitting && (
                  <>
                    {" "}
                    Create Account &nbsp;
                    <span className=" space-x-5">
                      <User />
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </fetcher.Form>
      </CardContent>
    </Card>
  );
}
