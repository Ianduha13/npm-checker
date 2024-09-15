"use client"
import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const {theme} = useTheme()

  return (
    <header className='bg-background border-b z-20 relative w-full px-4'>
      <nav className='w-full flex justify-between items-center max-w-[1440px] mx-auto py-4'>
        <Link href='/'>
            <picture className=' rounded-md bg-background '>
              <Image
                key={theme}
                src={theme === 'dark' ? '/assets/iconDark.png' : '/assets/icon.png'}
                alt='Shorkit Logo'
                width={980}
                height={337}
                className='w-32'
              />
            </picture>
        </Link>
        <ul className='hidden sm:flex items-center h-full gap-2'>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}
