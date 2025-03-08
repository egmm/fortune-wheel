import { PageProps } from "$fresh/server.ts";
import { signal } from "@preact/signals";
import FortuneWheel from "../../../islands/fortune-wheel.tsx";

const segments = signal<string[]>([]);

export default function SpinTheWheel(props: PageProps) {
  const url = new URL(props.url);
  segments.value = url.searchParams.get("segments")?.split(",") || [];

  return segments.value.length > 0
    ? <FortuneWheel segments={segments} />
    : (
      <div>
        <p>
          There are no options to spin the wheel.{" "}
          <a className="text-blue-500 hover:underline" href="/">Create a list</a>{" "}
          first
        </p>
      </div>
    );
}
