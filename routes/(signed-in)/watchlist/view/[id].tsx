import { Handlers, PageProps } from "$fresh/server.ts";
import { Bin } from "../../../../components/icons/Bin.tsx";
import { Watchlist, WatchlistState } from "./_middleware.ts";

export const handler: Handlers<Watchlist, WatchlistState> = {
  GET: (_req, _ctx) => {
    const watchlist = _ctx.state.watchlists.find(
      (watchlist) => watchlist.id === Number(_ctx.params.id),
    );
    if (watchlist === undefined) {
      console.error(`Watchlist not found: ${_ctx.params.id}`);
      return _ctx.renderNotFound();
    }
    return _ctx.render(watchlist);
  },
};
export default function WatchlistDetails(
  props: PageProps<Watchlist, WatchlistState>,
) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="p-4 w-full md:w-1/2">
        <h2>{props.data.name}</h2>
        <ul className="mt-4">
          {props.data.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-dark-background rounded-md p-4 mt-4"
            >
              <p>
                {item.title}
              </p>
              <a className="p-2" href={`/watchlist/remove/item/${props.data.id}/${item.id}`}>
                <Bin />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
