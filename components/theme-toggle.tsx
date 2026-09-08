'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'വെളിച്ച മോഡിലേക്ക് മാറുക' : 'ഇരുണ്ട മോഡിലേക്ക് മാറുക'}
      className="rounded-full"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
