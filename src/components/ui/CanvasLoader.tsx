/** Minimal loading state shown while the 3D scene chunk is fetched/compiled. */
export function CanvasLoader() {
  return (
    <div
      className="pointer-events-none fixed inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-16 w-16 animate-pulse-soft rounded-full bg-accent-gradient blur-2xl" />
    </div>
  );
}
