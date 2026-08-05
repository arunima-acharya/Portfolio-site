const FONT = "var(--font-source-serif-4), serif";

export default function HeroHeading() {
  return (
    <h1
      style={{
        color: "#e8510a",
        fontSize: "clamp(39px, 5.6vw, 78px)",
        fontFamily: FONT,
        fontWeight: 400,

        letterSpacing: "-0.04em",
        lineHeight: 1.2,
      }}
    >
      Hi,<br />I&apos;m Arunima!
    </h1>
  );
}
