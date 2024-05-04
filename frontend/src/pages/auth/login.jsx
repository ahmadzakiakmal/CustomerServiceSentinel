import { useState } from "react";
import Image from "next/image";
import Logo from "@/../public/assets/css_logo.svg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import cutMessage from "@/utilities/cutMessage";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.length < 1 || !email.includes("@") || !email.includes(".")) return toast.error("Invalid email");
    const toastify = toast.loading("Loading", { className: "custom" });
    setIsLoading(true);
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        router.replace("/dashboard");
        toast.update(toastify, {
          render: "Login success",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          className: "custom",
        });
      })
      .catch((err) => {
        toast.update(toastify, {
          render: cutMessage(err?.response?.data?.message) ?? "Can't connect to the server",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          className: "custom",
        });
      })
      .finally(() => setIsLoading(false));
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
            placeholder="johndoe@mail.com"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            state={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password here"
          />
          <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>Login</Button>
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

