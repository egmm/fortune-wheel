import { createBrowserClient } from "@supabase/ssr";

interface Props {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isLoggedIn: boolean;
}
export default function SignIn(
  { supabaseAnonKey, supabaseUrl, isLoggedIn }: Props,
) {
  const supabase = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  );
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:8000/auth/callback",
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  return (
    <div>
      {isLoggedIn
        ? <button onClick={signOut}>Sign out</button>
        : <button onClick={signIn}>Sign in</button>}
    </div>
  );
}
