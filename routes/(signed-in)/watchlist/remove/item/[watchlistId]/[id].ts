import { FreshContext } from "$fresh/server.ts";
import { createClient } from "../../../../../../lib/supabase.ts";

export default async function RemoveWatchlistItem(
  _req: Request,
  _ctx: FreshContext,
) {
  const headers = new Headers();
  const supabase = await createClient(_req, headers);

  const { id, watchlistId } = _ctx.params;
  const { error } = await supabase
    .from("watchlist_items")
    .delete()
    .eq("id", Number(id))

  if (error) {
    console.error(`Error deleting watchlist item: ${id}`, error);
    return new Response(null, { headers: { location: "/error" }, status: 500 });
  }

  console.log(`Deleted watchlist item ${id}`);

  return new Response(null, {
    headers: { location: `/watchlist/view/${watchlistId}` },
    status: 302,
  });
}
