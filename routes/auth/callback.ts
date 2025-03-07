import { FreshContext } from "$fresh/server.ts";
import { createClient } from "../../lib/supabase.ts";

export default async function AuthCallback(_req: Request, _ctx: FreshContext) {
  const { searchParams, origin } = new URL(_req.url);
  const code = searchParams.get("code");

  if (code !== null) {
    const headers = new Headers();
    const supabase = createClient(_req, headers);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      headers.set("Location", origin);
      return new Response(null, {
        status: 302,
        headers,
      });
    }
  }
  return new Response(null, { headers: { Location: "/error" }, status: 302 });
}
