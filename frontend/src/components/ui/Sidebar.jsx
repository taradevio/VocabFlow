// use link just like a href, but navlink when you need a visual indicator
import { Link, NavLink } from "react-router";
import { PracticeContext } from "../../context/PracticeContext";
import { useContext } from "react";
import { supabase } from "../../../auth/supabaseClient";

export const Sidebar = () => {
  const { session } = useContext(PracticeContext);


  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    
    <section className="">
      <div className="w-[250px] h-full text-center flex-col hidden lg:flex">
        <div className="py-5 px-2 border-b-1 border-r-1">
          <Link to="/">Logo</Link>
        </div>
        <div className="border-r-1 flex flex-col flex-1 justify-center">
          <ul className="grid grid-col-1 gap-15 content-center">
            {session ? (
              <>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/analytics">Analytics</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/add-word">Add Word</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/word-bank">Word Bank</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/practice">Practice</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/settings">Settings</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="http://localhost:5173" onClick={signOut}>
                    Sign Out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/analytics">Analytics</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/add-word">Add Word</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/word-bank">Word Bank</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/practice">Practice</NavLink>
                </li>
                <li className="cursor-pointer">
                  <NavLink to="/dashboard/settings">Settings</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};
