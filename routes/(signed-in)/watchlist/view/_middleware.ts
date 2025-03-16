import { FreshContext } from "$fresh/server.ts";
import { createClient } from "../../../../lib/supabase.ts";
import { AppState } from "../../_middleware.ts";

interface WatchlistItem {
  id: number;
  title: string;
}
export interface Watchlist {
  id: number;
  name: string;
  items: WatchlistItem[];
}
export interface WatchlistState extends AppState {
  watchlists: Watchlist[];
}
export async function handler(
  _req: Request,
  _ctx: FreshContext<WatchlistState>,
) {
  const headers = new Headers();
  const supabase = await createClient(_req, headers);

  const { data: watchlists, error } = await supabase
    .from("watchlists")
    .select(`
      id,
      name,
      items:watchlist_items(id, title)
    `)
    .eq("user_id", _ctx.state.userId);

  if (error !== null) {
    console.error(`Watchlist Error: ${error.message}`);
    return new Response(null, {
      headers: { ...headers, location: "/error" },
      status: 500,
    });
  }

  _ctx.state = {
    ..._ctx.state,
    watchlists,
  };

  return _ctx.next();
}
