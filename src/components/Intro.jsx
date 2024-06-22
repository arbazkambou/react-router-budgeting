import { CreateUserForm } from "./CreateUserForm";

function Intro() {
  return (
    <div>
      <h1 className=" my-5  font-bold text-center text-4xl">
        Your Personal <span className=" text-green-500"> Budgeting</span> App
      </h1>
      <div className=" flex justify-center">
        <hr className=" sm:w-[30%] w-[50%] border-4 border-green-600 rounded-md" />
      </div>

      <div className=" mt-28 mx-96">
        <CreateUserForm />
      </div>
    </div>
  );
}

export default Intro;
