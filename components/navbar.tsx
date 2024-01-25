'use client'
import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button
} from '@nextui-org/react'

import { useUser } from "@clerk/nextjs";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import Image from 'next/image'

export default function App() {
  const { isSignedIn } = useUser();
  console.log(isSignedIn)

  return (
    <Navbar>
      <NavbarBrand>
        <Link href='/' className='font-bold justify-start text-inherit'>
        <Image
          src="/motostudio.png"
          width={200}
          height={200}
          alt="Picture of the author"
        />
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        
      </NavbarContent>
      <NavbarContent as='div' justify='end'>

      <NavbarItem className='hidden lg:block'>
        <Link href="/somos" color="foreground">
        Quienes Somos
      </Link>
        </NavbarItem>
    {
        isSignedIn ? (
          <>
          <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton/>
        </SignedOut>
          </>
        ) : (
      <>
         

      <Link isBlock href="/sign-up">
        Registro
      </Link>
      <Button
      href="/sign-in"
      as={Link}
      color="primary"
      variant="solid"
    >
      Login
    </Button>
    </>
        )
      }
      </NavbarContent>
    </Navbar>
  )
}
