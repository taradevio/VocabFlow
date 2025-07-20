import { useContext } from "react";
import { PracticeContext } from "../context/PracticeContext";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../auth/supabaseClient";

export const Login = () => {
  // const [session, setSession] = useState(null);
  const { isLogin, session } = useContext(PracticeContext);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        redirectTo="http://localhost:5173/dashboard/analytics"
      />
    );
  }

  // return (

  //   <section>
  //     <div className="h-dvh grid place-content-center">
  //       <div className="border-2 rounded-md p-5 w-md">
  //         <div className="w-[50px] mx-auto mb-5">
  //           <NavLink to="/">
  //             <img
  //               src="/book-open-cover.svg"
  //               alt="logo"
  //               className="w-full object-cover"
  //             />
  //           </NavLink>
  //         </div>
  //         <h1 className="text-4xl font-semibold text-center">
  //           Sign In to Vocab
  //         </h1>
  //         <p className="text-center mt-1">Please sign in to continue</p>
  //         <div className="flex flex-col justify-center items-center gap-2 my-3">
  //           <Link to="/api/oauth/google/callback">
  //             <button
  //               className="border-1 rounded-sm w-full p-3 cursor-pointer"
  //               onClick={() => popUpSignin()}
  //             >
  //               Sign in with Google
  //             </button>
  //           </Link>
  //           <button className="border-1 rounded-sm w-full p-3">
  //             Sign in with Facebook
  //           </button>
  //         </div>
  //         <Button name="Sign In" />
  //       </div>
  //       <div></div>
  //     </div>
  //   </section>
  // );
};
