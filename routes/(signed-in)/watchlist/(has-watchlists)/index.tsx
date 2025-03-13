import { PageProps } from "$fresh/server.ts";
import { WatchlistState } from "./_middleware.ts";

export default function AllWatchlists(
  props: PageProps<null, WatchlistState>,
) {
  const { state } = props;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-bold text-3xl mb-4">My lists</h1>
      <ul className="w-full">
        {state.watchlists.map((watchlist) => (
          <li
            key={watchlist.id}
            className="bg-neutral-800 border border-gray-600 rounded-md p-4"
          >
            <a href={`/watchlist/${watchlist.id}`}>
              <h1 className="font-bold">{watchlist.name}</h1>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
