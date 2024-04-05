import { useState } from "react";
import Image from "next/image";
import Logo from "@/../public/assets/css_logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle register logic here
    alert(email + "\n" + password);
  };

  return (
    <div className="relative bg-white-bg min-h-screen flex flex-col justify-center items-center">
      <nav className="flex items-center absolute top-0 w-full justify-between px-8 pt-4 hover:underline">
        <Link href="/">Back</Link>
        <Image
          src={Logo}
          alt="Logo"
          className="w-[40px]"
        />
      </nav>

      <div className="flex w-[90%] sm:max-w-[384px] lg:max-w-[500px] justify-center items-center">
        <form
          className="p-6 w-full shadow-lg bg-white-bg rounded-md flex flex-col gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-center font-bold text-lg md:text-xl lg:text-2xl">Login Here!</h1>
          <FormInput
            label="Email"
            name="email"
            state={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            state={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-4 rounded bg-dark-brown hover:bg-dark-brown/90 active:bg-dark-brown/80 transition px-4 py-2 text-white-bg text-lg text-center font-semibold"
          >
            Login
          </button>
          <Link
            href="/auth/register"
            className="text-sm"
          >
            Don&apos;t have an account yet? <span className="hover:underline cursor-pointer">Register here!</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

function FormInput({ state, onChange, label, type = "text", name, placeholder = "placeholder" }) {
  return (
    <label
      htmlFor={name}
      className="font-bold lg:text-lg text-left text-dark-brown"
    >
      {label}
      <input
        name={name}
        type={type}
        className="w-full rounded-md bg-light-gray px-3 py-2 lg:py-2.5 font-medium text-black"
        placeholder={placeholder}
        value={state}
        onChange={onChange}
      />
    </label>
  );
}

