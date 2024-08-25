import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import BottomBar from "@/components/bottom-bar";
import RecoilRootWrapper from "@/components/recoil-root-wrapper";
import { getMe } from "./actions";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const me = await getMe();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-third font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="mx-auto min-h-screen max-w-xl bg-background">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // enableSystem
            // disableTransitionOnChange
          >
            <RecoilRootWrapper>
              {children}
              {modal}
              {me && <BottomBar me={me} />}
            </RecoilRootWrapper>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
