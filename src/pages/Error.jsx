import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, LucideHome, StepBack, Undo2 } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen w-[100%]">
      <Card className=" border-none shadow-none">
        <CardHeader>
          <CardTitle className=" text-3xl ">
            Uhh Ohh! <span>🫡</span> We've got a problem{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>{error.message || error.statusText}</CardContent>
        <CardFooter className=" flex gap-x-10">
          <Button onClick={() => navigate("/")}>
            Go home &nbsp;
            <span>
              <Home />
            </span>
          </Button>
          <Button onClick={() => navigate(-1)}>
            Go back &nbsp;
            <span>
              <Undo2 />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Error;
