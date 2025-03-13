import { PageProps } from "$fresh/server.ts";
import { AppState } from "./_middleware.ts";

export default function Home(props: PageProps<unknown, AppState>) {
  return (
    <div>
      <h1>Hello {props.state.userMetadata?.name}</h1>
      <a href="/watchlist/new">Create a list!</a>
    </div>
  );
}
