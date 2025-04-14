import React from 'react'
import { Button } from './button'
import Link from 'next/link'

function HeroSection() {
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
        <div className='space-y-6 text-center'>
            <div className='space-y-6 mx-auto'>
                <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl'>Elevate Your Career
                <br />
                to New Heights</h1>
                <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl '>Discover opportunities tailored just for you. From personalized job matches to expert interview prep — Elevate is your partner in professional growth.
                </p>
            </div>
            <div>
                <Link href="/dashboard">
                <Button size="lg"  className="bg-primary text-white hover:bg-primary/80">
                    Get Started
                </Button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default HeroSection
