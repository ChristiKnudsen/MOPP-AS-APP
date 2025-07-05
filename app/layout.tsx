import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import type { Language } from "@/lib/i18n"
import { ThemeProvider } from "@/components/theme-provider"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "MOPP App",
  description: "Created with v0",
  generator: "v0.dev",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Read language from cookies
  const lang = (cookies().get("NEXT_LOCALE")?.value || "en") as Language

  return (
    <html lang={lang}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
