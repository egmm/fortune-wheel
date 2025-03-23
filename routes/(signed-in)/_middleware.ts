import { FreshContext } from "$fresh/server.ts";
import { UserMetadata } from "@supabase/supabase-js";
import { createClient } from "../../lib/supabase.ts";

export interface AppState {
  userId: string;
  userMetadata?: UserMetadata;
}

export async function handler(_req: Request, _ctx: FreshContext<AppState>) {
  const headers = new Headers();
  const supabase = createClient(_req, headers);
  const { data } = await supabase.auth.getSession();

  const loggedIn = Boolean(data?.session);

  if (!loggedIn) {
    return new Response(null, {
      headers: { location: "/sign-in" },
      status: 302,
    });
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (user === null) {
    return new Response(null, {
      headers: { ...headers, location: "/error" },
      status: 500,
    });
  }

  _ctx.state = {
    userId: user.id,
    userMetadata: user.user_metadata,
  };

  const resp = await _ctx.next();
  return resp;
}
