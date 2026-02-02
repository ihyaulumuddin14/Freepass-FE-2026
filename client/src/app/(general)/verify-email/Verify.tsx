'use client'

import MainButton from "@/components/button/MainButton"
import Input from "@/components/input/Input"
import { ResendVerifyCredentials, ResendVerifySchema } from "@/schema/schema"
import { resendVerifyService, verifyService } from "@/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function Verify() {
   const params = useSearchParams()
   const tokenResult = params.get("token")
   const router = useRouter()
   const [isValid, setIsValid] = useState(true);

   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors },
    } = useForm<ResendVerifyCredentials>({
      resolver: zodResolver(ResendVerifySchema),
      mode: "onChange"
    });

    const handleResendSubmit = async (resendPayload: ResendVerifyCredentials) => {
      try {
        const { message } = await resendVerifyService(resendPayload)

        reset()
        toast.success(message)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }

   useEffect(() => {
      const redirectToLogin = async (token: string) => {
         try {
            const response = await verifyService({ token })
   
            if (response.success) toast.success(response.message)
            router.replace("/home?verified=true")
         } catch (error) {
            toast.error((error as Error).message)
            
            setIsValid(false)
         }
      }

      if (tokenResult) redirectToLogin(tokenResult as string)
   }, [tokenResult])




   if (isValid) return null

   return (
    <section className="w-full max-w-xs h-screen flex flex-col justify-center items-center mx-auto gap-6">
      <header className="flex flex-col justify-center items-center gap-5">
        <div className="h-52 aspect-square relative">
          <Image src="/something_wrong.webp" className="object-contain" sizes="200" fill alt="Something wrong image"/>
        </div>
        <h2 className="font-bold text-3xl text-center">Verification Link Expired</h2>
      </header>
      <main className="w-full flex flex-col gap-4">
        <p className="text-sm font-light text-center">Oops! This verification link has expired.
          No worries — you can request a new one and verify your email in just a moment.
        </p>

        <form onSubmit={handleSubmit(handleResendSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("email")}
            label="Email"
            placeholder="example@toeankoe.com"
            error={errors.email?.message}
          >
            <Mail />
          </Input>
          <MainButton
            className='w-full'
            disabled={(errors.email) ? true : false}
            isLoading={isSubmitting}
            type="submit"
            >
              Resend Link
          </MainButton>
        </form>
      </main>
      <footer>
      </footer>
    </section>
   )
}