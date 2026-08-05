"use client";

export default function HomeAbout() {
  return (
    <section
      style={{
        height: "100vh",
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingBottom: "60px",
        backgroundColor: "#efefef",
        paddingLeft: "calc(var(--gutter) * 0.9)",
        paddingRight: "calc(var(--gutter) * 0.9)",
      }}
    >
      <p
        style={{
          transformOrigin: "left bottom",
          fontSize: "clamp(2.11rem, 3.93vw, 3.65rem)",
          fontWeight: 800,
          lineHeight: 1.365,
          fontFamily: "var(--font-inter), sans-serif",
          color: "#e8510a",
          letterSpacing: "-0.04em",
          textAlign: "left",
          margin: 0,
        }}
      >
        I Work With Systems, Build
        <br />
        Human&nbsp;+&nbsp;Computer Interactions,
        <br />
        And Lead Teams For Products.
      </p>
    </section>
  );
}
