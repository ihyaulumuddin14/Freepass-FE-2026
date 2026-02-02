'use client'

import { useIsMobile } from "@/hooks/useIsMobile"
import Image from "next/image"
import HamburgerMenu from "../ui/hamburger-menu";
import MainButton from "../button/MainButton";
import { useSession } from "@/hooks/useSesssion";
import { useRouter } from "next/navigation";

const navListButton = {
  guest: [
    {
      content: "Shop",
      url: "/shop",
      variant: "outline"
    },
    {
      content: "Sign In",
      url: "/signin",
      variant: "outline"
    },
    {
      content: "Book Now",
      url: "/book",
      variant: "primary"
    },
  ],
  customer: [
    {
      content: "Shop",
      url: "/shop",
      variant: "outline"
    },
    {
      content: "Profile",
      url: "/profile",
      variant: "outline"
    },
    {
      content: "Book Now",
      url: "/book",
      variant: "primary"
    },
  ],
  barber: [
    {
      content: "Barber Dashboard",
      url: "/barber",
      variant: "primary"
    }
  ],
  admin: [
    {
      content: "Admin Dashboard",
      url: "/admin",
      variant: "primary"
    }
  ],
}

const Navbar = () => {
  const router = useRouter()
  const isMobile = useIsMobile();
  const { user } = useSession();

  return (
    <header className='w-full max-w-[1620px] p-6 lg:p-12 lg:py-8 fixed top-0 left-1/2 -translate-x-1/2'>
      <nav
        className="w-full h-14 flex justify-between gap-2 items-center bg-white/50 lg:bg-transparent rounded-md"
        >
          {/* LOGO */}
          <button 
            onClick={() => router.push("/home")}
            className="flex h-14 gap-2 px-4 py-1 items-center lg:bg-white/50 rounded-md relative cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.svg"
                alt="logo-toeankoe"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl">Toeankoe</h1>
          </button>

          {/* NAVIGATION */}
          <ul className="h-14 flex items-center gap-2 p-2 border rounded-md lg:bg-white/50">
            { isMobile ? (
              <div className="bg-primary-foreground p-2 rounded-md hover:scale-105 active:scale-95 transition-all duration-300">
                <HamburgerMenu />
              </div>
            ) : (
              <>
                {navListButton[
                  user && user.role && typeof user.role === 'string' && ['customer', 'barber', 'admin'].includes(user?.role.toLowerCase())
                    ? user.role.toLowerCase() as 'customer' | 'barber' | 'admin'
                    : 'guest'
                ].map((button, index) => (
                  <MainButton key={index} variant={button.variant as "outline" | "primary" | "secondary"} onClick={() => router.push(button.url)}>
                    {button.content}
                  </MainButton>
                ))}
              </>
            )}
          </ul>
      </nav>

    </header>
  )
}

export default Navbar