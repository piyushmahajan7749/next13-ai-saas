import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ToasterProvider } from "@/components/toaster-provider";
import { ModalProvider } from "@/components/modal-provider";
import { CrispProvider } from "@/components/crisp-provider";

import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gamethinking.ai",
  description: "AI Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <Theme
            accentColor="cyan"
            grayColor="gray"
            panelBackground="solid"
            scaling="100%"
            radius="full"
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
