import { FreshContext } from "$fresh/server.ts";
import { createClient } from "../../../../lib/supabase.ts";

export default async function RemoveWatchlist(
  _req: Request,
  _ctx: FreshContext,
) {
  const headers = new Headers();
  const supabase = await createClient(_req, headers);

  const { id } = _ctx.params;
  const { error } = await supabase
    .from("watchlists")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error(`Error deleting watchlist: ${id}`, error);
    return new Response(null, { headers: { location: "/error" }, status: 500 });
  }

  console.log(`Deleted watchlist ${id}`);

  return new Response(null, {
    headers: { location: "/watchlist/view" },
    status: 302,
  });
}
