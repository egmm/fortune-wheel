import { FreshContext } from "$fresh/server.ts";
import { createClient } from "../../lib/supabase.ts";

export interface AppState {
  username?: string;
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

  _ctx.state = {
    username: data.session?.user.user_metadata.name,
  } as AppState;

  const resp = await _ctx.next();
  return resp;
}
