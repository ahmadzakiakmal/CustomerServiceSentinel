import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-light-yellow">
      <h1 className="text-center text-4xl md:text-6xl lg:text-8xl font-medium text-dark-brown">
        404
      </h1>
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-medium text-dark-brown mt-4">
        Not Found
      </h2>
      <p className="text-center text-base md:text-lg font-normal text-light-brown mt-6">
        Oops, the page you are looking for doesn&apos;t exist or another error
        occurred.
      </p>
      <Link href="/" passHref>
        <button className="mt-8 px-4 py-2 bg-dark-brown w-48 text-white text-base md:text-lg font-medium rounded hover:bg-light-brown hover:text-dark-brown transition">
          HOME
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
