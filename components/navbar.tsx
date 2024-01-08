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

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href='/' className='font-bold text-inherit'>
          TVS Creditos
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

      <NavbarContent as='div' justify='end'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='primary'
              name='Jason Hughes'
              size='sm'
              src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem key='logout' color='danger'>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
