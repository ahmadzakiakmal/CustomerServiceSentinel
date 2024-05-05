import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/assets/css_logo.svg";

const Landing = () => {
  return (
    <div className="min-h-screen relative bg-white px-[5%] lg:px-0 flex flex-col justify-center items-center">
      <nav className="flex flex-row justify-end w-full fixed top-0 px-[5%] py-[50px] lg:px-[128px] lg:py-[32px] gap-8 text-[18px]">
        <NavbarLink href="/auth/login" text="Login" />
        <NavbarLink href="/auth/register" text="Register" />
      </nav>
      <div className="flex flex-row items-center">
        <Image
          priority
          src={Logo}
          alt="Logo"
          className="w-[100px] lg:w-[130.25px] !flex-shrink-0 z-[1]"
        />
        <div className="flex flex-col justify-start ml-2">
          <h2 className="font-extrabold drop-shadow text-2xl">
            CUSTOMER SERVICE
          </h2>
          <h2 className="text-5xl font-bold drop-shadow ">SENTINEL</h2>
        </div>
      </div>
      <div className="mt-4 lg:mt-8">
        <h2 className="text-[25px] lg:text-[32px] text-center lg:text-left font-medium text-dark-brown max-w-[500px] xl:max-w-[624px] mb-[74px]">
          Your AI Partner in Customer Satisfaction
        </h2>
      </div>
      <div className="grid grid-cols-3 justify-center gap-4 lg:px-[212px] text-dark-brown">
        <div className="flex flex-col justify-center  w-auto">
          <h2 className="text-[22px] mb-[18px]">Fast</h2>
          <h2 className="text-[18px]">
            Fast customer service AI ensures prompt assistance to meet the needs
            of customers efficiently
          </h2>
        </div>
        <div className="flex flex-col justify-center w-auto">
          <h2 className="text-[22px] mb-[18px]">Responsive</h2>
          <h2 className="text-[18px]">
            Responsive customer service AI guarantees quick and attentive
            assistance, adapting swiftly to address customer inquiries
          </h2>
        </div>
        <div className="flex flex-col justify-center w-auto">
          <h2 className="text-[22px] mb-[18px]">Adaptable</h2>
          <h2 className="text-[18px]">
            An adaptable customer service AI swiftly adjusts to various
            scenarios, offering tailored solutions to meet diverse customer
            needs effectively
          </h2>
        </div>
      </div>
    </div>
  );
};

function NavbarLink({ href, text }) {
  return (
    <Link
      href={href}
      className="font-medium text-dark-brown relative flex flex-col after:w-full after:h-[3px] after:bg-dark-brown after:origin-left after:scale-x-0 after:hover:scale-100 after:transition"
    >
      {text}
    </Link>
  );
}

export default Landing;
