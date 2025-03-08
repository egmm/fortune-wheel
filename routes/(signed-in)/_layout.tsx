import { PageProps } from "$fresh/server.ts";
import { AppState } from "./_middleware.ts";

export default function Layout(
  { Component }: PageProps<unknown, AppState>,
) {
  return (
    <>
      <nav className="navbar flex justify-between">
        <h1 className="text-2xl font-bold">
          <a href="/" className="text-white">SpinFlix</a>
        </h1>
      </nav>
      <Component />
    </>
  );
}
