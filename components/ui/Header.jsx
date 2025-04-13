import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './button'
import { LayoutDashboard } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'

function Header() {
  return (
    <div className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
      <nav className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href="/" >
         {/* <Image
         src={"https://www.elevateai.com/wp-content/uploads/2023/05/elevateai-AI-only-freestuffdev.png"}
         alt="logo"
          width={200}
          height={60}
         /> */}
          ELEVATE.AI
         
        </Link>
        <div>
          <Link href="/dashboard">
          <Button>
            <LayoutDashboard className=" h-4 w-4" />
            <span className="hidden md:block">Industry Insights</span>
          </Button>
          </Link>
          <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </div>
       
      </nav>
       

    </div>
  )
}

export default Header