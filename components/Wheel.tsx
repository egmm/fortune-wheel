import { Signal } from "@preact/signals";

interface Props {
  rotation: Signal<number>;
  segments: string[];
  segmentAngle: number;
}
export const Wheel = ({ rotation, segments, segmentAngle }: Props) => {
  return (
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
  );
};
