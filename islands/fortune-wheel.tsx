import { Signal, signal } from "@preact/signals";
import { Wheel } from "../components/Wheel.tsx";
import { useEffect } from "preact/hooks";

interface Props {
  segments: Signal<string[]>;
}

const NUMBER_OF_SPINS = 8;

const isSpinning = signal(false);
const result = signal<string | null>(null);
const rotation = signal(0);

const navigateToResult = (result: string) => {
  globalThis.location.href = `/spin-the-wheel/result?segment=${
    encodeURIComponent(result)
  }`;
};

const FortuneWheel = ({ segments }: Props) => {
  const segmentAngle = 360 / segments.value.length;

  useEffect(() => {
    const remainigSegments = segments.value.filter((value) =>
      value !== result.value
    );

    if (remainigSegments.length === 1) {
      setTimeout(() => {
        navigateToResult(remainigSegments[0]);
      }, 2000);
    } else if (result.value !== null) {
      setTimeout(() => {
        segments.value = remainigSegments;
        rotation.value = 0;
        result.value = null;
        isSpinning.value = false;
      }, 2000);
    }
  }, [result.value]);

  const onSpinningEnd = (selectedIndex: number) => () => {
    result.value = segments.value[selectedIndex];
  };
  const spinWheel = () => {
    if (isSpinning.value) return;

    isSpinning.value = true;
    const randomIndex = Math.floor(Math.random() * segments.value.length);
    const spinAngle = 360 * NUMBER_OF_SPINS - randomIndex * segmentAngle;

    setTimeout(onSpinningEnd(randomIndex), 3000);

    rotation.value = spinAngle;
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
        className="w-44 mt-12 px-6 py-4 bg-spinred rounded text-white font-bold disabled:opacity-50"
      >
        Spin!
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
