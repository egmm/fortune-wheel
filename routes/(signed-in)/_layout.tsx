import { PageProps } from "$fresh/server.ts";
import { UserMenu } from "../../islands/user-menu.tsx";
import { AppState } from "./_middleware.ts";

export default function Layout(
  { Component, state: { userMetadata } }: PageProps<unknown, AppState>,
) {
  return (
    <>
      <nav className="h-16 flex justify-between items-center p-4">
        <h4>
          <a href="/" className="text-white">FilmLib</a>
        </h4>

        <UserMenu
          avatarUrl={userMetadata?.avatar_url}
          supabaseAnonKey={Deno.env.get("SUPABASE_ANON_KEY") || ""}
          supabaseUrl={Deno.env.get("SUPABASE_URL") || ""}
        />
      </nav>
      <div className="w-full flex flex-1">
        <Component />
      </div>
    </>
  );
}
