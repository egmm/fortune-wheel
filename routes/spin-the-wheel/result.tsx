import { PageProps } from "$fresh/server.ts";

export default function Result(props: PageProps) {
  const url = new URL(props.url);
  const segment = url.searchParams.get("segment");
  return <h1>Result is {segment}</h1>;
}
