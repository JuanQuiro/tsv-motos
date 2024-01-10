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
  Avatar
} from '@nextui-org/react'

import {
  UserButton
} from '@clerk/nextjs'

import Image from 'next/image'

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href='/' className='font-bold justify-start text-inherit'>
        <Image
          src="/Logo-TVS.png"
          width={200}
          height={200}
          alt="Picture of the author"
        />
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/credito'>
            Acceder a credito
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='#' color='foreground'>
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Perfil
          </Link>
        </NavbarItem>
      </NavbarContent>
      <UserButton />
      <NavbarContent as='div' justify='end'></NavbarContent>
    </Navbar>
  )
}
