import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/assets/css_logo.svg";

const Landing = () => {
  return (
    <div className="min-h-screen relative bg-light-yellow px-[5%] lg:px-0 flex justify-center items-center">
      <nav className="flex flex-row justify-end w-full fixed top-0 px-[5%] py-[50px] lg:px-[128px] lg:py-[64px] gap-8 text-[18px]">
        <NavbarLink href="/about-us" text="About Us" />
        <NavbarLink href="/auth/login" text="Login" />
        <NavbarLink href="/auth/sign-up" text="Sign Up" />
      </nav>

      <div className="flex flex-col-reverse lg:flex-row justify-evenly items-center gap-[20px] //md:gap-[40px] //lg:gap-[128px] w-full max-w-[90%] 2xl:max-w-[1900px]">
        <div>
          <h2 className="text-[48px] lg:text-[68px] text-center lg:text-left font-medium text-dark-brown mt-4 leading-[100%]">
            Meet CSS,
          </h2>
          <h2 className="text-[25px] lg:text-[32px] text-center lg:text-left font-medium text-dark-brown mt-4 lg:max-w-[500px] xl:max-w-[624px]">
            Your AI Partner in Customer Satisfaction
          </h2>
        </div>
        <div className="flex justify-center items-center relative">
          <Image src={Logo} alt="Logo" className="w-[240px] lg:w-[272.25px] !flex-shrink-0 z-[1]" />
          <div className="w-full h-[95%] bg-dark-brown/60 absolute top-0 blur-[30px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

function NavbarLink({href, text}) {
  return(
    <Link href={href} className="font-medium text-dark-brown relative flex flex-col after:w-full after:h-[3px] after:bg-dark-brown after:origin-left after:scale-x-0 after:hover:scale-100 after:transition">
      {text}
    </Link>
  );
}

export default Landing;
