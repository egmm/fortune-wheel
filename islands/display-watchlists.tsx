import { signal } from "@preact/signals";
import { Bin } from "../components/icons/Bin.tsx";
import { VideoCamera } from "../components/icons/video-camera.tsx";
import { Watchlist } from "../routes/(signed-in)/watchlist/view/_middleware.ts";

const toRemove = signal<number[]>([]);
const isToRemove = (id: number) => toRemove.value.includes(id);
const toggleToRemove = (index: number) => {
  if (isToRemove(index)) {
    toRemove.value = toRemove.value.filter((i) => i !== index);
  } else {
    toRemove.value = [...toRemove.value, index];
  }
};

interface Props {
  watchlists: Watchlist[];
}
export const DisplayWatchlists = ({ watchlists }: Props) => {
  return (
    <>
      <div className="w-full md:w-1/2 h-full flex flex-col p-4 justify-between">
        <div>
          <h2>My lists</h2>
          {watchlists.length === 0 && (
            <p className="text-body-2 mt-4">
              You don't have any lists yet.{" "}
              <a className="text-primary" href="/watchlist/new">
                Create one to get started!
              </a>
            </p>
          )}
          <ul className="w-full mt-4">
            {watchlists.map((watchlist) => (
              <li
                key={watchlist.id}
                className={`flex justify-between items-center bg-surface border border-gray rounded-md p-4 ${
                  isToRemove(watchlist.id) ? "border-primary" : ""
                }`}
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
                <button
                  type="button"
                  onClick={() => {
                    toggleToRemove(watchlist.id);
                  }}
                  className="p-2"
                >
                  <Bin />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <form
        className="w-full flex justify-center self-end p-4"
        action="/watchlist/remove"
        method="POST"
      >
        {toRemove.value.map((item, i) => (
          <input
            key={i}
            type="hidden"
            name="itemsToRemove[]"
            value={item}
          />
        ))}
        {toRemove.value.length > 0
          ? (
            <button
              type="submit"
              className="flex items-center justify-center py-4 bg-primary rounded-md text-subtitle font-bold text-center w-full md:w-1/3"
            >
              <Bin /> Confirm removal
            </button>
          )
          : null}
      </form>
    </>
  );
};
