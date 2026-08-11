import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Anton, Manrope, Kanit, Source_Serif_4, Instrument_Serif, Playfair_Display, Caveat, Fraunces, Geist } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainientBackground from "@/components/ui/GrainientBackground";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-source-serif-4",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Variable across wght 400–900, so headings can pick any weight in that
// range without pulling extra font files.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

// Superr style reference — rounded display serif (substitute for gelica) +
// clean grotesque for secondary UI.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://arunima.online"),
  title: {
    default: "Arunima Acharya — Senior Product Designer",
    template: "%s | Arunima Acharya",
  },
  description:
    "Senior Product Designer with 6+ years crafting human-centered digital products. Specialized in product design, UX research, and design systems.",
  keywords: [
    "product designer",
    "UX designer",
    "UI designer",
    "design systems",
    "user experience",
    "portfolio",
  ],
  authors: [{ name: "Arunima Acharya" }],
  creator: "Arunima Acharya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunima.online",
    siteName: "Arunima Acharya — Product Designer",
    title: "Arunima Acharya — Senior Product Designer",
    description:
      "Senior Product Designer with 6+ years crafting human-centered digital products.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arunima Acharya — Senior Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arunima Acharya — Senior Product Designer",
    description:
      "Senior Product Designer with 6+ years crafting human-centered digital products.",
    creator: "@arunimaacharya",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${anton.variable} ${manrope.variable} ${kanit.variable} ${sourceSerif4.variable} ${instrumentSerif.variable} ${playfairDisplay.variable} ${caveat.variable} ${fraunces.variable} ${geist.variable} light`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);})();` }} />
      </head>
      <body className="antialiased" style={{ color: "var(--text-primary)", fontFamily: "var(--font-geist), sans-serif" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-white text-black px-4 py-2 rounded-lg text-sm font-medium"
        >
          Skip to main content
        </a>
        <GrainientBackground />
        <CustomCursor />
        <ThemeProvider>
          <div style={{ position: "relative", zIndex: 1 }}>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
