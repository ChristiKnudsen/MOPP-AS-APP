"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { type Language, languages } from "@/lib/i18n"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"

interface LanguageSelectorProps {
  currentLanguage: Language
}

export function LanguageSelector({ currentLanguage }: LanguageSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createURL = (lang: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("lang", lang)
    return `${pathname}?${params.toString()}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Globe className="h-4 w-4" />
          {languages[currentLanguage]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => {
              // Use router.push to navigate to the new URL
              router.push(createURL(code))
            }}
            className={currentLanguage === code ? "bg-accent" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
