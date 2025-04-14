import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './button'
import { FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
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
        <span className='text-bold font-extrabold'> ELEVATE.AI</span>
         
        </Link>
        
           
        <div className='flex items-center space-x-4 md:space-x-4'>
        <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
        <SignedIn>
          <Link href={"/dashboard"} >
          <Button >
            <LayoutDashboard className=" h-4 w-4" />
            <span className="hidden md:block">Industry Insights</span>
          </Button>
          </Link>
        
           
            <DropdownMenu>
  <DropdownMenuTrigger>
  <Button>
            <StarsIcon className=" h-4 w-4" />
            <span className="hidden md:block">Growth Tools</span>
          </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Link href={"/resume"} className='flex items-center gap-2'>
      <FileText className=" h-4 w-4" />
      <span>Resume Builder</span>
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem> <Link href={"/ai-cover-latter"} className='flex items-center gap-2'>
      <PenBox className=" h-4 w-4" />
      <span>Cover Latter</span>
      </Link></DropdownMenuItem>
    <DropdownMenuItem> <Link href={"/interview"} className='flex items-center gap-2'>
      <GraduationCap className=" h-4 w-4" />
      <span>Interview Prep</span>
      </Link></DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>

              <UserButton />
            </SignedIn>
        </div>
       
      </nav>
       

    </div>
  )
}

export default Header