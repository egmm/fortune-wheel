import { Handlers } from "$fresh/server.ts";
import { createClient } from "../../../../lib/supabase.ts";
import { WatchlistState } from "../view/_middleware.ts";

export const handler: Handlers<unknown, WatchlistState> = {
  async POST(
    _req,
    _ctx,
  ) {
    const headers = new Headers();
    const supabase = await createClient(_req, headers);

    const formData = await _req.formData();
    const itemsToRemove = formData.getAll("itemsToRemove[]");

    const { error } = await supabase
      .from("watchlists")
      .delete()
      .in("id", itemsToRemove.map(Number));

    if (error) {
      console.error(
        `Error deleting watchlists: ${itemsToRemove.join(", ")}`,
        error,
      );
      return new Response(null, {
        headers: { location: "/error" },
        status: 500,
      });
    }

    console.log(`Deleted watchlist ${itemsToRemove.join(", ")}`);

    return new Response(null, {
      headers: { location: "/watchlist/view" },
      status: 302,
    });
  },
};
