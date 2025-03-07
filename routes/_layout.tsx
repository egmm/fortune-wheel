import { PageProps } from "$fresh/server.ts";
import SignIn from "../islands/sign-in.tsx";
import { AppState } from "./_middleware.ts";

export default function Layout(
  { Component, state }: PageProps<unknown, AppState>,
) {
  return (
    <>
      <nav className="navbar flex justify-between">
        <h1 className="text-2xl font-bold">
          <a href="/" className="text-white">SpinFlix</a>
        </h1>
        <SignIn
          supabaseUrl={Deno.env.get("SUPABASE_URL") || ""}
          supabaseAnonKey={Deno.env.get("SUPABASE_ANON_KEY") || ""}
          isLoggedIn={state.loggedIn}
        />
      </nav>
      <Component />
    </>
  );
}
