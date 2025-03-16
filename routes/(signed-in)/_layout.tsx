import { PageProps } from "$fresh/server.ts";
import { Dot } from "../../components/icons/Dot.tsx";
import { Home } from "../../components/icons/Home.tsx";
import { List } from "../../components/icons/List.tsx";
import { UserMenu } from "../../islands/user-menu.tsx";
import { AppState } from "./_middleware.ts";

const routes = {
  home: "/",
  watchlist: "/watchlist/view",
};
export default function Layout(
  { Component, state: { userMetadata }, route }: PageProps<unknown, AppState>,
) {
  return (
    <>
      <header className="h-16 flex justify-between items-center p-4">
        <h4>
          <a href="/" className="text-white">FilmLib</a>
        </h4>

        <UserMenu
          avatarUrl={userMetadata?.avatar_url}
          supabaseAnonKey={Deno.env.get("SUPABASE_ANON_KEY") || ""}
          supabaseUrl={Deno.env.get("SUPABASE_URL") || ""}
        />
      </header>
      <div className="w-full flex flex-1">
        <Component />
      </div>
      <nav className="h-16 flex justify-center items-center px-4 py-8">
        <a
          href={routes.home}
          className="flex flex-col items-center mr-20"
        >
          <Home />
          <Dot className={route === routes.home ? "" : "invisible"} />
        </a>
        <a href={routes.watchlist} className="flex flex-col items-center">
          <List />
          <Dot className={route === routes.watchlist ? "" : "invisible"} />
        </a>
      </nav>
    </>
  );
}
