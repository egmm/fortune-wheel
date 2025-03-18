// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_signed_in_layout from "./routes/(signed-in)/_layout.tsx";
import * as $_signed_in_middleware from "./routes/(signed-in)/_middleware.ts";
import * as $_signed_in_index from "./routes/(signed-in)/index.tsx";
import * as $_signed_in_spin_the_wheel_index from "./routes/(signed-in)/spin-the-wheel/index.tsx";
import * as $_signed_in_spin_the_wheel_result from "./routes/(signed-in)/spin-the-wheel/result.tsx";
import * as $_signed_in_watchlist_new_create from "./routes/(signed-in)/watchlist/new/create.tsx";
import * as $_signed_in_watchlist_new_index from "./routes/(signed-in)/watchlist/new/index.tsx";
import * as $_signed_in_watchlist_remove_id_ from "./routes/(signed-in)/watchlist/remove/[id].ts";
import * as $_signed_in_watchlist_view_id_ from "./routes/(signed-in)/watchlist/view/[id].tsx";
import * as $_signed_in_watchlist_view_middleware from "./routes/(signed-in)/watchlist/view/_middleware.ts";
import * as $_signed_in_watchlist_view_index from "./routes/(signed-in)/watchlist/view/index.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $auth_callback from "./routes/auth/callback.ts";
import * as $error from "./routes/error.tsx";
import * as $sign_in from "./routes/sign-in.tsx";
import * as $create_list from "./islands/create-list.tsx";
import * as $fortune_wheel from "./islands/fortune-wheel.tsx";
import * as $social_sign_in from "./islands/social-sign-in.tsx";
import * as $user_menu from "./islands/user-menu.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/(signed-in)/_layout.tsx": $_signed_in_layout,
    "./routes/(signed-in)/_middleware.ts": $_signed_in_middleware,
    "./routes/(signed-in)/index.tsx": $_signed_in_index,
    "./routes/(signed-in)/spin-the-wheel/index.tsx":
      $_signed_in_spin_the_wheel_index,
    "./routes/(signed-in)/spin-the-wheel/result.tsx":
      $_signed_in_spin_the_wheel_result,
    "./routes/(signed-in)/watchlist/new/create.tsx":
      $_signed_in_watchlist_new_create,
    "./routes/(signed-in)/watchlist/new/index.tsx":
      $_signed_in_watchlist_new_index,
    "./routes/(signed-in)/watchlist/remove/[id].ts":
      $_signed_in_watchlist_remove_id_,
    "./routes/(signed-in)/watchlist/view/[id].tsx":
      $_signed_in_watchlist_view_id_,
    "./routes/(signed-in)/watchlist/view/_middleware.ts":
      $_signed_in_watchlist_view_middleware,
    "./routes/(signed-in)/watchlist/view/index.tsx":
      $_signed_in_watchlist_view_index,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/auth/callback.ts": $auth_callback,
    "./routes/error.tsx": $error,
    "./routes/sign-in.tsx": $sign_in,
  },
  islands: {
    "./islands/create-list.tsx": $create_list,
    "./islands/fortune-wheel.tsx": $fortune_wheel,
    "./islands/social-sign-in.tsx": $social_sign_in,
    "./islands/user-menu.tsx": $user_menu,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
