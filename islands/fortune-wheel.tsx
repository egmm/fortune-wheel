import { signal } from "@preact/signals";
import { Wheel } from "../components/Wheel.tsx";
import { useRef } from "preact/hooks";

const segments = signal<string[]>([]);
const isSpinning = signal(false);
const result = signal<string | null>(null);
const rotation = signal(0);

const FortuneWheel = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const segmentAngle = 360 / segments.value.length;

  const spinWheel = () => {
    if (isSpinning.value) return;

    isSpinning.value = true;
    const randomIndex = Math.floor(Math.random() * segments.value.length);
    const spinAngle = 360 * 3 + randomIndex * segmentAngle;

    setTimeout(() => {
      isSpinning.value = false;
      result.value = segments.value[randomIndex];
    }, 3000);

    rotation.value = rotation.value + spinAngle;
  };

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
            if (e.key === 'Enter') {
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
      <Wheel
        rotation={rotation}
        segments={segments}
        segmentAngle={segmentAngle}
      />
      {segments.value.length > 0 && (
        <button
          onClick={spinWheel}
          disabled={isSpinning.value}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Spin
        </button>
      )}
      {result.value && (
        <div className="mt-4 text-lg font-bold">You won: {result.value}</div>
      )}
    </div>
  );
};

export default FortuneWheel;
