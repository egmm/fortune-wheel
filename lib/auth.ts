const callbackPath = "/auth/callback";

export const getCallbackUrl = () =>
  Deno.env.get("IS_DEV") === "true"
    ? `http://localhost:8000${callbackPath}`
    : `https://filmlib.deno.dev${callbackPath}`;
