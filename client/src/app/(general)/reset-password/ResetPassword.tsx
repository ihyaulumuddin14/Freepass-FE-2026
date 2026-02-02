'use client'

import MainButton from "@/components/button/MainButton"
import Input from "@/components/input/Input"
import { ResetPasswordCredentials, ResetPasswordSchema } from "@/schema/schema"
import { resetPasswordService } from "@/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordCredentials>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange"
  });

  useEffect(() => {
    if (token) {
      setValue("token", token)
    }
  }, [token])

  const handleResetPasswordSubmit = async (payload: ResetPasswordCredentials) => {
    try {
      const { message } = await resetPasswordService(payload)

      reset()
      toast.success(message)
      router.replace("/signin")
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  if (!token) {
    return null
  }

  return (
    <section className="w-full max-w-xl h-screen flex flex-col justify-center lg:p-6 mx-auto gap-6">
      <header className="flex flex-col justify-center items-center gap-5">
        <div className="h-52 aspect-square relative">
          <Image src="/something_wrong.webp" className="object-contain" sizes="200" fill alt="Reset password image"/>
        </div>
        <h2 className="font-bold text-3xl text-center">Reset Password</h2>
      </header>
      <main className="w-full flex flex-col gap-4">
        <p className="text-sm font-light text-center">
          Enter your new password below. Make sure its at least 8 characters long.
        </p>

        <form onSubmit={handleSubmit(handleResetPasswordSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("password")}
            label="New Password"
            placeholder="********"
            isPassword
            error={errors.password?.message}
          >
            <Lock />
          </Input>
          <input type="hidden" {...register("token")} />
          <MainButton
            className='w-full'
            disabled={(errors.password || errors.token) ? true : false}
            isLoading={isSubmitting}
            type="submit"
          >
            Reset Password
          </MainButton>
        </form>
      </main>
      <footer>
      </footer>
    </section>
  )
}
