import { Signal } from "@preact/signals";

interface Props {
  rotation: Signal<number>;
  segments: Signal<string[]>;
  segmentAngle: number;
}

const generateColors = (count: number): string[] => {
  return Array.from(
    { length: count },
    (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`,
  );
};

export const Wheel = ({ rotation, segments, segmentAngle }: Props) => {
  const colors = generateColors(segments.value.length);
  return segments.value.length > 0
    ? (
      <div className="relative w-full flex flex-col items-center justify-center">
        <div
          id="indicator"
          className="w-12 h-12 top-12 bg-slate-900 clip-triangle"
        >
        </div>
        <div
          id="wheel"
          className="relative w-96 h-96 border-4 border-gray-300 rounded-full overflow-hidden transition-transform ease-out duration-[3000ms]"
          style={{ transform: `rotate(${rotation.value}deg)` }}
        >
          {segments.value.map((segment, index) => (
            <div
              className="absolute w-1/2 h-1/2 origin-bottom-right clip-wedge flex items-center justify-center"
              style={{
                transform: `rotate(${index * segmentAngle + 45}deg)`,
                backgroundColor: colors[index],
              }}
            >
              <span className="rotate-[45deg]">{segment}</span>
            </div>
          ))}
        </div>
      </div>
    )
    : null;
};
