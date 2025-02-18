import { signal } from "@preact/signals";

const segments = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
];
const isSpinning = signal(false);
const result = signal<string | null>(null);
const rotation = signal(0);

const Wheel = () => {
  const segmentAngle = 360 / segments.length;

  const spinWheel = () => {
    if (isSpinning.value) return;

    isSpinning.value = true;
    const randomIndex = Math.floor(Math.random() * segments.length);
    const spinAngle = 360 * 3 + randomIndex * segmentAngle;

    setTimeout(() => {
      isSpinning.value = false;
      result.value = segments[randomIndex];
    }, 3000);

    rotation.value = rotation.value + spinAngle;
  };
  return (
    <div className="h-full flex flex-col items-center">
      <div
        id="wheel"
        className="relative w-64 h-64 border-4 border-gray-300 rounded-full overflow-hidden transition-transform ease-out duration-[3000ms]"
        style={{ transform: `rotate(${rotation.value}deg)` }}
      >
        {segments.map((segment, index) => (
          <div
            key={index}
            className="absolute w-full h-full flex"
            style={{ transform: `rotate(${index * segmentAngle}deg)` }}
          >
            <div className="w-1/2 h-full flex items-center justify-center border-r-2 border-gray-300 origin-bottom">
              {segment}
            </div>
          </div>
        ))}
      </div>
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

export default Wheel;
