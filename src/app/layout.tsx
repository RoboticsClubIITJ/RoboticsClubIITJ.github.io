import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={`${inter.variable} antialiased min-h-screen bg-background`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
