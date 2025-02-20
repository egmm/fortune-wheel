import { Signal, signal } from "@preact/signals";
import { Wheel } from "../components/Wheel.tsx";

const isSpinning = signal(false);
const result = signal<string | null>(null);
const rotation = signal(0);

interface Props {
  segments: Signal<string[]>;
}
const FortuneWheel = ({ segments }: Props) => {
  const segmentAngle = 360 / segments.value.length;

  const spinWheel = () => {
    if (isSpinning.value) return;

    isSpinning.value = true;
    const randomIndex = Math.floor(Math.random() * segments.value.length);
    const spinAngle = 360 * 3 + randomIndex * segmentAngle;

    setTimeout(() => {
      isSpinning.value = false;
      result.value = segments.value[randomIndex];

      // removing selected segment
      segments.value = segments.value.filter((_, index) =>
        index !== randomIndex
      );
    }, 3000);

    rotation.value = rotation.value + spinAngle;
  };

  return (
    <div className="h-full flex flex-col items-center">
      <Wheel
        rotation={rotation}
        segments={segments}
        segmentAngle={segmentAngle}
      />
      <button
        onClick={spinWheel}
        disabled={isSpinning.value}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Spin
      </button>
      {result.value && (
        <div className="mt-4 text-lg font-bold">You won: {result.value}</div>
      )}
    </div>
  );
};

export default FortuneWheel;
