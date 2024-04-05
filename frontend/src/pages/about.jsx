import Link from "next/link";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="h-screen bg-white-bg relative">
      <div className="absolute flex flex-row top-0 right-0 mt-4">
        <h1 className="mr-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
          Login
        </h1>
        <h1 className="mr-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
          Sign Up
        </h1>
      </div>
      <div className="absolute top-20 w-full flex justify-center">
        <div className="mx-auto flex flex-col items-center justify-center">
          <img
            src="../public/assets/css_logo_wtext.svg"
            alt="logo"
            width="300px"
          />
          <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-medium text-dark-brown mt-4">
            Your AI Partner in Customer Satisfaction
          </h2>
          <div className="flex justify-center items-center">
            <div className="mt-8 mr-8 ml-8 flex flex-row">
              <div className="flex-1 mr-4 p-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-dark-brown">
                  Fast
                </h1>
                <h1 className="mt-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
                  Fast customer service AI ensures prompt assistance to meet the
                  needs of customers efficiently
                </h1>
              </div>
              <div className="flex-1 mr-4 p-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-dark-brown">
                  Responsive
                </h1>
                <h1 className="mt-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
                  Responsive customer service AI guarantees quick and attentive
                  assistance, adapting swiftly to address customer inquiries
                </h1>
              </div>
              <div className="flex-1 p-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-dark-brown">
                  Adaptable
                </h1>
                <h1 className="mt-4 text-sm md:text-base lg:text-lg font-medium text-dark-brown">
                  An adaptable customer service AI swiftly adjusts to various
                  scenarios, offering tailored solutions to meet diverse
                  customer needs effectively
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
