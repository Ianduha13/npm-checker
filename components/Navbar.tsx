"use client"

import React, { useState, useEffect } from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { GitHubStars } from './GitHubStars'

export default function Navbar() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const icon = theme === 'dark' ? '/assets/iconDark.png' : '/assets/icon.png'

  return (
    <header className='bg-background border-b z-20  relative w-full px-4'>
      <nav className='w-full flex justify-between items-center max-w-[1440px] mx-auto py-4'>
        <Link href='/'>
          <picture className='rounded-md bg-background'>
            {mounted && (
            <Image
              key={theme}
              src={icon}
              alt='Npm Update Check Logo'
              width={980}
              height={337}
              className='w-24'
            />)}
          </picture>
        </Link>
        <ul className='hidden sm:flex items-center h-full gap-2'>
          <li>
            <GitHubStars repoUrl='https://github.com/Ianduha13/npm-check' repoName='Ianduha13/npm-check'/>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}