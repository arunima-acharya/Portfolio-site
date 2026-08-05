export default function GrainientBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      backgroundColor: "var(--bg-secondary)",
    }} />
  );
}
