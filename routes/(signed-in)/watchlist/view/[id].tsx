import { Handlers, PageProps } from "$fresh/server.ts";
import UpdateWatchlist from "../../../../islands/update-list.tsx";
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
        <UpdateWatchlist watchlist={props.data} />
      </div>
    </div>
  );
}
