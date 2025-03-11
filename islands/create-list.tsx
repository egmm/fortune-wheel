import { signal } from "@preact/signals";
import { useRef } from "preact/hooks";

const segments = signal<string[]>([]);

const CreateList = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addSegment = () => {
    if (inputRef.current?.value.trim()) {
      segments.value = [...segments.value, inputRef.current.value.trim()];
      inputRef.current.value = "";
    }
  };
  return (
    <div className="h-full flex flex-col items-center">
      <form action="/new-watchlist/create" method="GET" className="mt-4">
        <input
          type="text"
          name="name"
          defaultValue="New list"
          className="mt-4 px-4 py-2 bg-background border border-gray-600 rounded-md"
        />
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            className="mt-4 px-4 py-2 bg-background border border-gray-600 rounded-md"
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
            className="mt-4 ml-4 px-4 py-2 bg-spinred rounded"
          >
            Add
          </button>
        </div>
        <ul className="w-full md:w-1/3 mt-4 p-4">
          {segments.value.map((segment, index) => (
            <li key={index} className="py-4 border-b border-gray-600">
              {segment}
            </li>
          ))}
        </ul>

        {segments.value.length > 0 && (
          <>
            <input
              type="hidden"
              name="items"
              value={segments.value.join(",")}
            />
            <button
              type="submit"
              className="w-44 px-6 py-4 bg-spinred rounded"
            >
              Save
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateList;
