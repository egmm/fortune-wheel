import { PageProps } from "$fresh/server.ts";
import { Bin } from "../../../../components/icons/Bin.tsx";
import { VideoCamera } from "../../../../components/icons/video-camera.tsx";
import { WatchlistState } from "./_middleware.ts";

export default function AllWatchlists(
  props: PageProps<null, WatchlistState>,
) {
  const { state } = props;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full md:w-1/2 h-full flex flex-col p-4 justify-between">
        <div>
          <h2>My lists</h2>
          {state.watchlists.length === 0 && (
            <p className="text-body-2 mt-4">
              You don't have any lists yet. Create one to get started!
            </p>
          )}
          <ul className="w-full mt-4">
            {state.watchlists.map((watchlist) => (
              <li
                key={watchlist.id}
                className="flex justify-between items-center bg-surface border border-gray rounded-md p-4"
              >
                <a className="flex-1" href={`/watchlist/view/${watchlist.id}`}>
                  <h4>{watchlist.name}</h4>
                  <div className="flex items-center mt-2">
                    <VideoCamera className="text-primary" />
                    <p className="ml-2 text-body-2">
                      {watchlist.items.length} films
                    </p>
                  </div>
                </a>
                <a
                  href={`/watchlist/remove/${watchlist.id}`}
                  className="p-2"
                >
                  <Bin />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-center self-end">
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
