'use client'

import MainButton from "@/components/button/MainButton"
import Input from "@/components/input/Input"
import { ForgotPasswordCredentials, ForgotPasswordSchema } from "@/schema/schema"
import { forgotPasswordService } from "@/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function ForgotPassword() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPasswordCredentials>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange"
  });

  const handleForgotPasswordSubmit = async (payload: ForgotPasswordCredentials) => {
    try {
      const { message } = await forgotPasswordService(payload)

      reset()
      toast.success(message)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className="w-full max-w-xl h-screen flex flex-col justify-center lg:p-6 mx-auto gap-6">
      <header className="flex flex-col justify-center items-center gap-5">
        <div className="h-52 aspect-square relative">
          <Image src="/something_wrong.webp" className="object-contain" sizes="200" fill alt="Forgot password image"/>
        </div>
        <h2 className="font-bold text-3xl text-center">Forgot Password</h2>
      </header>
      <main className="w-full flex flex-col gap-4">
        <p className="text-sm font-light text-center">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(handleForgotPasswordSubmit)} className="flex flex-col gap-4">
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
            Send Reset Link
          </MainButton>
        </form>
      </main>
      <footer>
      </footer>
    </section>
  )
}
