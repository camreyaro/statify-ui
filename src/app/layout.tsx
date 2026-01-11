import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import MuiThemeProvider from "./MuiThemeProvider";

export const metadata: Metadata = {
  title: "Statify",
  description: "Statify app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}
