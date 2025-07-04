"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import BorderedButton from "./bordered-button"
import { useState } from "react"
import { usePathname } from "next/navigation"

interface INavLink {
  name: string
  href: string
}

export default function NavigationBar({className}: {className:string}) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  
  const path = usePathname()
  const navLink: INavLink[] = [
    { name: "Home", href: path == "/" ? "#home" : "/"},
    { name: "About", href: path == "/" ? "#about" : "/about"},
    { name: "Projects", href: path == "/" ? "#projects" : "/projects"},
    { name: "News", href: path == "/" ? "#news" : "/news"},
    { name: "Contact", href: path == "/" ? "#contact" : "/contact"},
  ]

  return (
    <nav className={"w-full " + " " + className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="dark:text-white font-semibold text-lg tracking-wide">
              SOFOSTROBOTIC
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLink.map((link, index) => (
                <Link href={link.href} key={index} className="dark:text-gray-300 text-gray-500 hover:text-black dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Theme switcher and Login */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher Placeholder - Replace with your existing theme switcher */}
            <ThemeToggle />

            {/* Login Button */}
            <Link href="/login">
              <BorderedButton text={"Login"} swap={true} className="bg-white dark:bg-black"/>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsNavMenuOpen(!isNavMenuOpen)} size="icon" className="dark:text-gray-300 text-black rounded-none border p-5 border-black dark:border-white  hover:text-black dark:hover:text-white">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - You can expand this as needed */}
      <div className={"md:hidden " + " " + (isNavMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black border border-black dark:border-white">
          {navLink.map((link, index) => (
            <Link href={link.href} key={index} className="dark:text-gray-300 text-gray-500 hover:text-black dark:hover:text-white block px-3 py-2 text-base font-medium">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
