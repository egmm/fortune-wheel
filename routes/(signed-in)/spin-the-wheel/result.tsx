import { PageProps } from "$fresh/server.ts";

export default function Result(props: PageProps) {
  const url = new URL(props.url);
  const segment = url.searchParams.get("segment");
  return (
    <div className="pt-24 flex flex-col items-center bg-background text-white">
      <h2 className="text-2xl">Congratulations! 🎉</h2>
      <h3 className="text-lg">You are watching:</h3>
      <h1 className="pt-12 text-6xl text-center">{segment}</h1>
    </div>
  );
}
