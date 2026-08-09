import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robotics Club IIT Jodhpur",
  description:
    "Official website of the Robotics Club, IIT Jodhpur. Exploring the frontiers of autonomous and intelligent systems for a better world",
  keywords: [
    "IIT Jodhpur",
    "IITJ",
    "Robotics Club",
    "Robotics Society",
    "ROS",
    "Computer Vision",
    "Autonomous Systems",
    "India",
    "College Club",
  ],
  openGraph: {
    title: "Robotics Club IIT Jodhpur",
    description:
      "Official website of the Robotics Club, IIT Jodhpur. Exploring the frontiers of autonomous and intelligent systems for a better world",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground relative`}>
        {/* Site-wide Background Video */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
          <video 
            src="/StartVideo.mp4"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover opacity-35"
          />
          {/* Corner vignette / gradient overlay to darken corners and edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
