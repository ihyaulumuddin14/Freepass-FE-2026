import { ChevronLeft } from "lucide-react";
// import SimpleNavbar from "../SimpleNavbar";
import Link from "next/link";
import Image from "next/image"
import SimpleNavbar from "../navbar/SimpleNavbar";

type AuthLayoutType = {
  level: "page" | "dialog"
  children: React.ReactNode,
  welcomeTitle: string,
  subtitle?: string
  footer: string,
  footerUrl: string
}

export default function AuthLayout({
  level,
  children,
  welcomeTitle,
  subtitle,
  footer,
  footerUrl
} : AuthLayoutType) {
  return (
    <section className={`relative w-full ${level === "page" ? "h-screen" : "h-fit"} flex flex-col justify-start items-center`}>
      <header className="w-xs flex flex-col justify-center items-center gap-5 my-6">
        <div className="relative h-20 w-30">
          <Image fill src="/logo.svg" alt="logo" className="object-contain"/>
        </div>
        <h2 className="font-bold text-3xl text-center">{welcomeTitle}</h2>
        <p className="text-sm font-light text-center">{subtitle}</p>
      </header>

      <main className="w-full max-w-lg p-2 lg:p-5">
        {children}
      </main>

      <footer>
        <p className="text-sm flex gap-1 font-light">
          {footer}
          <Link href={footerUrl} className="text-accent-foreground font-medium">
            {footerUrl === '/signin' ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </footer>
    </section>
  )
}