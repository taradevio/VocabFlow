import { Link } from "react-router";

export const Button = () => {
  return (
    <Link
      className="w-fit block rounded-md py-3 px-5 mx-auto text-center bg-[#4F46E5] text-white text-sm sm:text-lg"
      to="/dashboard"
    >
      Join Waiting List
    </Link>
  );
};
