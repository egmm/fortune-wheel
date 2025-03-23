interface Props {
  className?: string;
}
export const Dot = ({ className }: Props) => (
  <div className={`w-2 h-2 mt-2 bg-primary rounded-full ${className}`} />
);
