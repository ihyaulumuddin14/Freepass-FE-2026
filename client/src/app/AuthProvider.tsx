"use client"

import { useSession } from "@/hooks/useSesssion"
import { ReactNode, useEffect } from "react"

export default function AuthInit({ children }: { children: ReactNode }) {
  const { fetchSession } = useSession()

  useEffect(() => {
    fetchSession()
  }, [])

  return children
}