import { Button } from "./ui/Button";
import { NavLink, Link } from "react-router";
import { useOauthPopupLogin } from "@hono/auth-js/react";

export const Login = () => {

  const {popUpSignin} = useOauthPopupLogin("google", {
    callbackUrl: "auth/success",
  });
  return (
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
            <Link to="/api/oauth/google/callback">
              <button
                className="border-1 rounded-sm w-full p-3 cursor-pointer"
                onClick={() => popUpSignin()}
              >
                Sign in with Google
              </button>
            </Link>
            <button className="border-1 rounded-sm w-full p-3">
              Sign in with Facebook
            </button>
          </div>
          <Button name="Sign In" />
        </div>
        <div></div>
      </div>
    </section>
  );
};
