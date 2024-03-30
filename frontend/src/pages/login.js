import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle register logic here
  };

  return (
    <div className="relative bg-white-bg">
      <div className="flex justify-between mx-8 pt-4">
        <a>Back</a>
        <img src="../public/assets/css_logo.svg" alt="logo" width="40px" />
      </div>
      <div className="flex h-screen justify-center items-center">
        <div className="w-96 p-6 shadow-lg bg-white-bg rounded-md">
          <h1 className="text-center font-bold text-lg md:text-xl lg:text-2xl">
            Login Here!
          </h1>
          <div className="mt-8 md:text-md text-sm font-bold lg:text-lg text-left text-dark-brown">
            Email
          </div>
          <div className="w-90">
            <input
              type="text"
              className="h-[32px]  w-full 
      rounded-md bg-light-gray 
      p-3 text-xs mt-2
      text-black
      md:h-[36px] md:text-sm
      lg:h-[40px] lg:text-base"
              placeholder="email address"
            />
          </div>
          <div className="md:text-md mt-2 lg:mt-4 text-sm font-bold lg:text-lg text-left text-dark-brown">
            Password
          </div>
          <div className="w-90">
            <input
              type="text"
              className="h-[32px]  w-full 
      rounded-md bg-light-gray 
      p-3 text-xs mt-2
      text-black
      md:h-[36px] md:text-sm
      lg:h-[40px] lg:text-base"
              placeholder="password"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-4 lg:mt-8 rounded bg-dark-brown px-4 py-2 text-white-bg text-sm md:text-md lg:text-lg text-center font-semibold"
          >
            Login
          </button>
          <a href="" className="text-xs lg:text-sm">
            Don't have an account yet?{" "}
            <span className="hover:underline hover:font-medium cursor-pointer">
              Register here!
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
