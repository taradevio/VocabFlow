import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <header>
      <div className="border-1 border-[#4F46E5] text-white fixed bottom-5 w-xs rounded-lg py-3 left-[50%] translate-x-[-50%] bg-[#4F46E5] sm:bottom-auto sm:top-5">
        <nav>
            {/* <div>
              <img src="/logo-demo.png" alt="website icon"/>
            </div> */}
          <ul className="flex justify-center items-center gap-7">
            <NavLink>Features</NavLink>
            <NavLink>Why It Works</NavLink>
            <NavLink>FAQ</NavLink>
            <NavLink to="/login">Login</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};
