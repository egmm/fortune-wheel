import { PageProps } from "$fresh/server.ts";
import { UserMenu } from "../../islands/user-menu.tsx";
import { AppState } from "./_middleware.ts";

export default function Layout(
  { Component, state: { userMetadata } }: PageProps<unknown, AppState>,
) {
  return (
    <>
      <nav className="navbar flex justify-between">
        <h1 className="text-2xl font-bold">
          <a href="/" className="text-white">FilmLib</a>
        </h1>

        <UserMenu
          avatarUrl={userMetadata?.avatar_url}
          supabaseAnonKey={Deno.env.get("SUPABASE_ANON_KEY") || ""}
          supabaseUrl={Deno.env.get("SUPABASE_URL") || ""}
        />
      </nav>
      <Component />
    </>
  );
}
