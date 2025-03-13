import { Handlers, PageProps } from "$fresh/server.ts";
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
    <div>
      <h1>{props.data.name}</h1>
      <ul>
        {props.data.items.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  );
}
