import SocialSignIn from "../islands/social-sign-in.tsx";

export default function SignIn() {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-screen space-y-24 p-4">
        <h1 className="font-bold text-5xl">FilmLib</h1>
        <div className="flex flex-col space-y-4 w-full items-center">
          <p>Sign in to your account</p>
          <SocialSignIn
            supabaseAnonKey={Deno.env.get("SUPABASE_ANON_KEY") || ""}
            supabaseUrl={Deno.env.get("SUPABASE_URL") || ""}
            redirectUri="http://localhost:8000/auth/callback"
          />
        </div>
      </div>
    </div>
  );
}
