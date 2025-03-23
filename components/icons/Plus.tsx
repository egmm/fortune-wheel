interface Props {
  className?: string;
}
export const Plus = ({ className }: Props) => (
  <svg
    class={`w-6 h-6 text-gray-800 dark:text-white ${className}`}
    aria-hidden="true"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 12h14m-7 7V5"
    />
  </svg>
);
