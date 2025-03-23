import { signal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { Edit } from "../components/icons/Edit.tsx";
import { Plus } from "../components/icons/Plus.tsx";
import { Bin } from "../components/icons/Bin.tsx";

const listName = signal<string>("New list");
const segments = signal<string[]>([]);

const CreateList = () => {
  const inputRef = useRef<HTMLInputElement>(null);

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
      action="/watchlist/new/create"
      method="GET"
      className="w-full px-4 md:px-[20%] py-10 flex flex-col justify-between"
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
        <ul className="w-full mt-4">
          {segments.value.map((segment, index) => (
            <li
              key={index}
              className="flex justify-between mt-4 p-4 border border-gray rounded-md"
            >
              {segment}
              <button type="button" onClick={() => removeSegment(index)}>
                <Bin />
              </button>
            </li>
          ))}
        </ul>

        <input
          type="hidden"
          name="items"
          value={segments.value.join(",")}
        />
      </div>
      <button
        type="submit"
        className={`w-full md:w-60 self-center px-6 py-4 bg-primary ${
          segments.value.length === 0 ? "opacity-50" : ""
        } rounded text-subtitle font-bold`}
        disabled={segments.value.length === 0}
      >
        Save
      </button>
    </form>
  );
};

export default CreateList;
