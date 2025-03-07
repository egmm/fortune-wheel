import { FreshContext } from "$fresh/server.ts";
import { createClient } from "../lib/supabase.ts";

export interface AppState {
  loggedIn: boolean;
  username?: string;
  [key: string]: unknown;
}

export async function handler(_req: Request, _ctx: FreshContext) {
  const headers = new Headers();
  const supabase = createClient(_req, headers);
  const { data } = await supabase.auth.getSession();

  _ctx.state = {
    loggedIn: Boolean(data?.session),
    username: data.session?.user.user_metadata.name,
  } as AppState;

  const resp = await _ctx.next();
  return resp;
}
