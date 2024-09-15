"use client"

import React, { useState, useEffect } from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { GitHubStars } from './GitHubStars'

export default function Navbar() {
  const { theme } = useTheme()

  return (
    <header className='bg-background border-b z-20  relative w-full px-4'>
      <nav className='w-full flex justify-between items-center max-w-[1440px] mx-auto py-4'>
        <Link href='/'>
          <picture className='rounded-md bg-background'>
            <Image
              key={theme}
              src={theme === 'dark' ? '/assets/iconDark.png' : '/assets/icon.png'}
              alt='Npm Update Check Logo'
              width={980}
              height={337}
              className='w-24'
            />
          </picture>
        </Link>
        <ul className=' sm:flex items-center h-full gap-2'>
          <li className='hidden sm:inline-flex'>
            <GitHubStars repoUrl='https://github.com/Ianduha13/npm-checker' repoName='Ianduha13/npm-checker'/>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}