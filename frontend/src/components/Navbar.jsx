import { NavLink, Link } from "react-router";
import { PracticeContext } from "../context/PracticeContext";
import { useContext } from "react";

export const Navbar = () => {
  const { isLogin, session } = useContext(PracticeContext);
  console.log(isLogin);


  return (
    <header>
      <div className="border-1 border-[#4F46E5] text-white fixed bottom-5 w-xs rounded-lg py-3 left-[50%] translate-x-[-50%] bg-[#4F46E5] sm:bottom-auto sm:top-5">
        <nav>
          {/* <div>
              <img src="/logo-demo.png" alt="website icon"/>
            </div> */}
          <ul className="flex justify-center items-center gap-7">
            <NavLink to="#features">Features</NavLink>
            <NavLink to="#benefits">Why It Works</NavLink>
            <NavLink to="#faqs">FAQ</NavLink>
            {isLogin ? (
              <Link to="/dashboard/analytics">
                {session?.user.user_metadata.full_name}
              </Link>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
