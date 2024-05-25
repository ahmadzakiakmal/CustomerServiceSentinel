import { useState } from "react";
import Image from "next/image";
import Logo from "@/../public/assets/css_logo.svg";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import cutMessage from "@/utilities/cutMessage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle register logic here
    if (!username) return toast.error("Username can't be empty", { className: "custom" });
    if (!email) return toast.error("Email can't be empty", { className: "custom" });
    if (email.length < 1 || !email.includes("@") || !email.includes("."))
      return toast.error("Invalid email", { className: "custom" });
    if (password !== confirmPassword)
      return toast.error("Password and its confirmation is not the same", { className: "custom" });

    const toastify = toast.loading("Loading", { className: "custom" });
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
        user_name: username,
        email,
        password,
      })
      .then(() => {
        router.push("/auth/login");
        toast.update(toastify, {
          render: "Register success, you can now log in",
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
      });
  };

  return (
    <div className="relative bg-white-bg min-h-screen flex flex-col justify-center items-center p-4">
      <nav className="flex items-center absolute top-0 w-full justify-between px-4 pt-4 md:px-8">
        <button
          className="hover:underline"
          onClick={() => router.back()}
        >
          Back
        </button>
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            className="w-10 sm:w-12"
          />
        </Link>
      </nav>

      <div className="flex w-full max-w-xs sm:max-w-md lg:max-w-lg justify-center items-center">
        <form
          className="p-4 w-full shadow-lg bg-white rounded-md flex flex-col gap-4 sm:p-6 sm:gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-center font-bold text-lg sm:text-xl lg:text-2xl">Register Here!</h1>
          <FormInput
            label="Username"
            type="text"
            name="username"
            state={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe123"
          />
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
          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            state={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
          <Button
            className="w-full text-white"
            disabled={!username || !email || !password || !confirmPassword}
            type="submit"
          >
            Register
          </Button>
          <Link
            href="/auth/login"
            className="text-sm"
          >
            Do you have an account? <span className="hover:underline cursor-pointer">Login here!</span>
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
      className="font-bold text-sm sm:text-base lg:text-lg text-left text-dark-brown"
    >
      {label}
      <input
        name={name}
        type={type}
        className="w-full rounded-md bg-light-gray px-2 py-2 sm:px-3 sm:py-2.5 font-medium text-black"
        placeholder={placeholder}
        value={state}
        onChange={onChange}
      />
    </label>
  );
}
