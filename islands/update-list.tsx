import { signal } from "@preact/signals";
import { Edit } from "../components/icons/Edit.tsx";
import { Watchlist } from "../routes/(signed-in)/watchlist/view/_middleware.ts";
import { useEffect, useRef } from "preact/hooks";
import { Plus } from "../components/icons/Plus.tsx";
import { Bin } from "../components/icons/Bin.tsx";

const listName = signal<string>("");
const segments = signal<string[]>([]);

interface Props {
  watchlist: Watchlist;
}
export default function UpdateWatchlist({ watchlist }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDirty = listName.value !== watchlist.name ||
    segments.value.length > 0;

  useEffect(() => {
    listName.value = watchlist.name;
  }, [watchlist]);

  const addSegment = () => {
    if (inputRef.current?.value.trim()) {
      segments.value = [...segments.value, inputRef.current.value.trim()];
      inputRef.current.value = "";
    }
  };
  const removeSegment = (index: number) => {
    segments.value = segments.value.filter((_, i) => i !== index);
  };
  return (
    <form
      className="h-full flex flex-col justify-between"
      action={`/watchlist/update/${watchlist.id}`}
      method="POST"
    >
      <div>
        <div className="flex items-center">
          <Edit />
          <textarea
            name="name"
            value={listName.value}
            className="w-full bg-base-background text-h2 font-bold focus:ring-2 focus:ring-transparent focus:outline-none resize-none overflow-hidden"
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              listName.value = target.value;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        </div>

        <div className="w-full flex items-center">
          <input
            ref={inputRef}
            type="text"
            className="mt-4 px-4 py-2 bg-base-background border border-gray rounded-md flex-1"
            placeholder="Add a film"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSegment();
              }
            }}
          />
          <button
            type="button"
            onClick={addSegment}
            className="mt-4 ml-4 px-4 py-2 bg-primary rounded"
          >
            <Plus />
          </button>
        </div>

        <ul className="mt-4">
          {/* Initial items */}
          {watchlist.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-dark-background rounded-md p-4 mt-4"
            >
              <p>
                {item.title}
              </p>
              <a
                className="p-2"
                href={`/watchlist/remove/item/${watchlist.id}/${item.id}`}
              >
                <Bin />
              </a>
            </li>
          ))}

          {/* New items */}
          {segments.value.map((segment, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-dark-background rounded-md p-4 mt-4"
            >
              <input
                key={index}
                type="hidden"
                name="newItems[]"
                value={segment}
              />
              <p>{segment}</p>
              <button
                className="p-2"
                type="button"
                onClick={() => removeSegment(index)}
              >
                <Bin />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex justify-center">
        <button
          className={`py-4 bg-primary rounded-md text-subtitle font-bold text-center w-full md:w-1/3 ${
            !isDirty ? "opacity-50" : ""
          }`}
          disabled={!isDirty}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
