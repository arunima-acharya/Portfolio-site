import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Arunima Acharya — Senior Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#fdfbf9";
const CHARCOAL = "#171717";
const COCOA = "#2b1a07";
const ORANGE = "#ff6f1e";
const SIENNA = "#ce500a";

export default async function Image() {
  const [alekanRegular, alekanBold] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/alekan/Alekan-Regular.ttf")),
    readFile(join(process.cwd(), "src/fonts/alekan/Alekan-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: CREAM,
        }}
      >
        <div style={{ width: 20, height: "100%", backgroundColor: ORANGE, display: "flex" }} />
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 88px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              color: SIENNA,
              fontFamily: "Alekan",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            arunima.online
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1.05,
              color: CHARCOAL,
              fontFamily: "Alekan",
              fontWeight: 700,
            }}
          >
            Arunima Acharya
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: SIENNA,
              fontFamily: "Alekan",
              fontWeight: 400,
              marginTop: 20,
            }}
          >
            Senior Product Designer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: COCOA,
              opacity: 0.65,
              fontFamily: "Alekan",
              fontWeight: 400,
              marginTop: 44,
            }}
          >
            3+ years - 40+ products shipped
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Alekan", data: alekanRegular, style: "normal", weight: 400 },
        { name: "Alekan", data: alekanBold, style: "normal", weight: 700 },
      ],
    }
  );
}
