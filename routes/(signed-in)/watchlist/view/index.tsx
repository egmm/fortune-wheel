import { PageProps } from "$fresh/server.ts";
import { WatchlistState } from "./_middleware.ts";

export default function AllWatchlists(
  props: PageProps<null, WatchlistState>,
) {
  const { state } = props;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full md:w-1/2 flex flex-col p-4">
        <h2>My lists</h2>
        <ul className="w-full mt-4">
          {state.watchlists.map((watchlist) => (
            <li
              key={watchlist.id}
              className="bg-surface border border-gray rounded-md p-4"
            >
              <a href={`/watchlist/view/${watchlist.id}`}>
                <h4>{watchlist.name}</h4>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
