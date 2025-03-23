import { PageProps } from "$fresh/server.ts";
import { DisplayWatchlists } from "../../../../islands/display-watchlists.tsx";
import { WatchlistState } from "./_middleware.ts";

export default function AllWatchlists(
  props: PageProps<null, WatchlistState>,
) {
  const { state } = props;

  return (
    <div className="w-full flex flex-col items-center">
      <DisplayWatchlists watchlists={state.watchlists} />
    </div>
  );
}
