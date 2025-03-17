import { PageProps } from "$fresh/server.ts";
import { VideoCamera } from "../../../../components/icons/video-camera.tsx";
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
              <div className="flex items-center mt-2">
                <VideoCamera className="text-primary" />
                <p className="ml-2 text-body-2">
                  {watchlist.items.length} films
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
