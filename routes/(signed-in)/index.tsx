import { PageProps } from "$fresh/server.ts";
import { AppState } from "./_middleware.ts";

export default function Home(props: PageProps<unknown, AppState>) {
  return (
    <div className="w-full p-4 flex flex-col justify-between">
      <h2>Hi {props.state.userMetadata?.name}</h2>
      <div className="w-full flex justify-center">
        <a
          className="py-4 bg-primary rounded-md text-subtitle font-bold text-center w-full md:w-1/3"
          href="/watchlist/new"
        >
          Create new list
        </a>
      </div>
    </div>
  );
}
