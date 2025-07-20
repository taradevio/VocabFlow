import { useContext } from "react";
import { Button } from "@radix-ui/themes";
import { PracticeContext } from "../context/PracticeContext";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../auth/supabaseClient";
import { NavLink } from "react-router";

export const Login = () => {
  // const [session, setSession] = useState(null);
  const {  session } = useContext(PracticeContext);
  const signUp = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:5173/dashboard/analytics"
      },
    });
  };

  if (!session) {
    return (
      // <Auth
      //   supabaseClient={supabase}
      //   appearance={{ theme: ThemeSupa }}
      //   redirectTo=""
      // />

      <section>
        <div className="h-dvh grid place-content-center">
          <div className="border-2 rounded-md p-5 w-md">
            <div className="w-[50px] mx-auto mb-5">
              <NavLink to="/">
                <img
                  src="/book-open-cover.svg"
                  alt="logo"
                  className="w-full object-cover"
                />
              </NavLink>
            </div>
            <h1 className="text-4xl font-semibold text-center">
              Sign In to Vocab
            </h1>
            <p className="text-center mt-1">Please sign in to continue</p>
            <div className="flex flex-col justify-center items-center gap-2 my-3">
              <Button
                className="border-1 rounded-sm w-full cursor-pointer"
                onClick={() => signUp("google")}
                color="gray"
                size="3"
                highContrast
              >
                <img src="/google.svg" alt="google icon" />
                Sign in with Google
              </Button>
              <Button
                className="border-1 rounded-sm w-full cursor-pointer"
                onClick={() => signUp("facebook")}
                color="gray"
                size="3"
                highContrast
              >
                <img src="/facebook.svg" alt="facebook icon" />
                Sign in with Facebook
              </Button>
            </div>
          </div>
        </div>
      </section>
    );

    //   <Button color="gray" highContrast>
    //
    //     Sign in With Google
    //   </Button>
    // );
  }

  // return (
};
