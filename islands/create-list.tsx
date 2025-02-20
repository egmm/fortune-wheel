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
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          className="mt-4 px-4 py-2 border"
          name="segment"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSegment();
            }
          }}
        />
        <button
          onClick={addSegment}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
      <ul className="mt-4">
        {segments.value.map((segment, index) => (
          <li key={index} className="py-2">{segment}</li>
        ))}
      </ul>

      <form action="/spin-the-wheel" method="GET" className="mt-4">
        <input type="hidden" name="segments" value={segments.value.join(",")} />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Play!
        </button>
      </form>
    </div>
  );
};

export default CreateList;
