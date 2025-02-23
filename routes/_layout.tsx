import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <nav className="navbar">
        <h1 className="text-2xl font-bold">
          <a href="/" className="text-white">SpinFlix</a>
        </h1>
      </nav>
      <Component />
    </>
  );
}
