import Link from "next/link";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="h-screen relative bg-white-bg">
      <div className="absolute flex flex-row top-0 right-0 mt-4">
        <h1 className="mr-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
          About Us
        </h1>
        <h1 className="mr-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
          Login
        </h1>
        <h1 className="mr-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
          Sign Up
        </h1>
      </div>
      <div className="absolute flex flex-row ml-16" style={{ top: "50px" }}>
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-dark-brown mt-4">
            Meet CSS,
          </h2>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-dark-brown mt-4">
            Your AI Partner in Customer Satisfaction
          </h2>
        </div>
        <div className="ml-4">
          <img src="../public/assets/css_logo.svg" alt="logo" width="300px" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
