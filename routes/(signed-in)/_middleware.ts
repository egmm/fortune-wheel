import { FreshContext } from "$fresh/server.ts";
import { UserMetadata } from "@supabase/supabase-js";
import { createClient } from "../../lib/supabase.ts";

export interface AppState {
  userMetadata?: UserMetadata;
  [key: string]: unknown;
}

export async function handler(_req: Request, _ctx: FreshContext) {
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
  _ctx.state = {
    userMetadata: user?.user_metadata,
  } as AppState;

  const resp = await _ctx.next();
  return resp;
}
