"use client";

export default function VeldaraSection() {
  return (
    <div style={{ width: "100%", height: "70vh", overflow: "hidden" }}>
      <iframe
        src="/veldara.html"
        style={{
          width: "300%",
          height: "300%",
          border: "none",
          display: "block",
          transform: "scale(0.333)",
          transformOrigin: "top left",
        }}
        title="Veldara"
      />
    </div>
  );
}
