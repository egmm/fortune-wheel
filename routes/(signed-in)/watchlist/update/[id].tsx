import { Handlers } from "$fresh/server.ts";
import { createClient } from "../../../../lib/supabase.ts";
import { WatchlistState } from "../view/_middleware.ts";

export const handler: Handlers<unknown, WatchlistState> = {
  async POST(_req, _ctx) {
    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    const supabase = await createClient(_req, headers);

    const { id } = _ctx.params;
    const formData = await _req.formData();
    const name = formData.get("name");
    const newItems = formData.getAll("newItems[]");
    const itemsToRemove = formData.getAll("itemsToRemove[]");

    if (name) {
      const { error } = await supabase
        .from("watchlists")
        .update({ name: name as string })
        .eq("id", Number(id));

      if (error) {
        console.error(`Error updating watchlist: ${id}`, error);
        return new Response(null, {
          headers: { location: "/error" },
          status: 500,
        });
      }
    }

    console.log(`Updated watchlist ${id}`);

    if (newItems.length) {
      const items = newItems.map((item) => ({
        watchlist_id: id,
        user_id: _ctx.state.userId,
        title: item as string,
      }));

      const { error } = await supabase.from("watchlist_items").insert(items);

      if (error) {
        console.error(`Error adding items to watchlist: ${id}`, error);
        return new Response(null, {
          headers: { location: "/error" },
          status: 500,
        });
      }
    }

    if (itemsToRemove.length) {
      const { error } = await supabase
        .from("watchlist_items")
        .delete()
        .in("id", itemsToRemove.map((i) => Number(i)));

      if (error) {
        console.error(`Error deleting watchlist item: ${id}`, error);
        return new Response(null, {
          headers: { location: "/error" },
          status: 500,
        });
      }
    }

    return new Response(null, {
      headers: { location: `/watchlist/view/${id}` },
      status: 302,
    });
  },
};
