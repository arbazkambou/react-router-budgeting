import { CreateUserForm } from "./CreateUserForm";

function Intro() {
  return (
    <>
      <h1 className=" my-5  font-bold text-center text-4xl">
        Your Personal <span className=" text-violet-600"> Budgeting</span> App
      </h1>
      <div className=" flex justify-center">
        <hr className=" sm:w-[30%] w-[50%] border-4 border-violet-600 rounded-md" />
      </div>

      <div className="flex flex-col sm:flex-row justify-around items-center mt-10 sm:mx-20">
        <div className="w-[90%] ">
          <CreateUserForm />
        </div>
        <div className="w-[90%] flex sm:justify-end justify-center">
          <img src="bg.jpg" alt="xyz" className="h-[500px] rounded-md" />
        </div>
      </div>
    </>
  );
}

export default Intro;
