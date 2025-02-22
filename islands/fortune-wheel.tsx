import { Signal, signal } from "@preact/signals";
import { Wheel } from "../components/Wheel.tsx";
import { useEffect } from "preact/hooks";

interface Props {
  segments: Signal<string[]>;
}

const isSpinning = signal(false);
const result = signal<string | null>(null);
const rotation = signal(0);
const isDone = signal(false);

const navigateToResult = (result: string) => {
  globalThis.location.href = `/spin-the-wheel/result?segment=${
    encodeURIComponent(result)
  }`;
};

const FortuneWheel = ({ segments }: Props) => {
  const segmentAngle = 360 / segments.value.length;

  useEffect(() => {
    if (isDone.value) {
      setTimeout(() => {
        navigateToResult(segments.value[0]);
      }, 2000);
    }
  }, [isDone.value]);

  const onSpinningEnd = (selectedIndex: number) => () => {
    isSpinning.value = false;
    result.value = segments.value[selectedIndex];

    segments.value = segments.value.filter((_, index) =>
      index !== selectedIndex
    );

    if (segments.value.length === 1) {
      isDone.value = true;
    }
  };
  const spinWheel = () => {
    if (isSpinning.value) return;

    isSpinning.value = true;
    const randomIndex = Math.floor(Math.random() * segments.value.length);
    // 3 means that we're doing 3 full spins
    const spinAngle = 360 * 3 - randomIndex * segmentAngle;

    setTimeout(onSpinningEnd(randomIndex), 3000);

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
        <div className="mt-4 text-lg font-bold">
          Eliminating: {result.value}
        </div>
      )}
    </div>
  );
};

export default FortuneWheel;
