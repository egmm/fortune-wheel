export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      😵
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <a className="mt-4 text-blue-500 hover:underline" href="/">
        Go back home
      </a>
    </div>
  );
}
