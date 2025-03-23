import { createClient } from "../../../../lib/supabase.ts";

export default async function CreateWatchlist(_req: Request) {
  const headers = new Headers();
  const supabase = await createClient(_req, headers);

  const { searchParams } = new URL(_req.url);
  const watchlistName = searchParams.get("name");
  const items = searchParams.get("items");

  if (watchlistName === null || items === null) {
    console.error("Create watchlist Error: Missing watchlist name or items");
    return new Response(null, {
      headers: { ...headers, location: "/error" },
      status: 400,
    });
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (user === null) {
    console.error("Create watchlist Error: User not found");
    return new Response(null, {
      headers: { ...headers, location: "/error" },
      status: 500,
    });
  }

  const { data: watchlist, error: watchlistError } = await supabase
    .from("watchlists")
    .insert({ user_id: user.id, name: watchlistName })
    .select("id")
    .single();

  if (watchlistError !== null) {
    console.error(`Create watchlist Error: ${watchlistError.message}`);
    return new Response(null, {
      headers: { ...headers, location: "/error" },
      status: 500,
    });
  }
  console.log(`Created watchlist: ${watchlist.id}`);

  const { error: watchlistItemError } = await supabase
    .from("watchlist_items")
    .insert(
      items.split(",").map((title) => ({
        user_id: user.id,
        watchlist_id: watchlist.id,
        title,
      })),
    );

  if (watchlistItemError !== null) {
    console.error(`Create watchlist Error: ${watchlistItemError.message}`);
    return new Response(null, {
      headers: { ...headers, location: "/error" },
      status: 500,
    });
  }
  console.log(
    `Added ${items.split(",").length} items to watchlist: ${watchlist.id}`,
  );

  return new Response(null, {
    headers: { ...headers, location: "/watchlist/view" },
    status: 302,
  });
}
