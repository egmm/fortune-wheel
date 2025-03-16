import { signal } from "@preact/signals";
import { createBrowserClient } from "@supabase/ssr";

const dropdownOpen = signal(false);

interface Props {
  avatarUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}
export const UserMenu = (
  { avatarUrl, supabaseAnonKey, supabaseUrl }: Props,
) => {
  const supabase = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  );
  const signOut = async () => {
    await supabase.auth.signOut();
    location.reload();
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => dropdownOpen.value = !dropdownOpen.value}
      >
        <img
          class="w-10 h-auto p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
          src={avatarUrl}
          alt="User dropdown"
        />
      </button>
      <div
        className={`absolute ${
          dropdownOpen.value ? "" : "hidden"
        } right-0 top-[120%] z-10 bg-surface divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="py-1">
          <button
            type="button"
            onClick={signOut}
            className="w-full px-4 py-2 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
