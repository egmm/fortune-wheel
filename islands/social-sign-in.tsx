import { createBrowserClient } from "@supabase/ssr";
import { GoogleSignInButton } from "../components/google-sing-in-button.tsx";

interface Props {
  supabaseUrl: string;
  supabaseAnonKey: string;
  redirectUri: string;
}
export default function SocialSignIn(
  { supabaseAnonKey, supabaseUrl, redirectUri }: Props,
) {
  const supabase = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  );
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUri,
      },
    });
  };

  return <GoogleSignInButton onClick={signIn} />;
}
