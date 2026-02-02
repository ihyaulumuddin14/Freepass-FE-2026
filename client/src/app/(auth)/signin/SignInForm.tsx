'use client'

import MainButton from '@/components/button/MainButton'
import Checkbox from '@/components/checkbox/Checkbox'
import Input from '@/components/input/Input'
import Divider from '@/components/ui/divider'
import Image from 'next/image'
import { SignInCredentials, SignInSchema } from '@/schema/schema'
import { signInService } from '@/services/auth.service'
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Lock, UserRound } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { toast } from 'sonner'
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const searchParams = useSearchParams()
  const [onPasswordBlur, setOnPasswordBlur] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignInCredentials>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
    defaultValues: {
      rememberMe: false
    }
  });

  const handleResponseSignIn = async (data: SignInCredentials) => {
    try {
      const { message } = await signInService(data)

      reset()
      toast.success(message)
      router.replace("/home")
    } catch (error) {
      toast.error((error as Error).message)
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const response = await signIn("google", {
        redirect: false,
        callbackUrl: searchParams.get("callbackUrl") ?? "/home"
      })
      
      if (!response?.ok) {
        throw new Error(response?.error || "Failed to login with Google")
      }
      
      toast.success("Login successfully")
      router.replace(response.url ?? "/home")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login with Google")
    }
  }


  return (
    <form
      onSubmit={handleSubmit(handleResponseSignIn)}
      className="flex flex-col gap-3"
    >
      {/* EMAIL INPUT */}
      <Input
        {...register("email")}
        label="Email"
        placeholder="example@toeankoe.com"
        error={errors.email?.message}
      >
        <UserRound />
      </Input>

      {/* PASSWORD INPUT */}
      <div className="flex flex-col gap-1">
        <Input
          {...register("password", { onBlur: () => setOnPasswordBlur(true) })}
          label="Password"
          placeholder="********"
          isPassword
        >
          <Lock />
        </Input>
        <p
          className={`text-xs font-light
            ${
              onPasswordBlur &&
              errors.password &&
              watch("password")?.length > 0
                ? "text-pink-600"
                : !errors.password && watch("password")?.length > 0
                ? "text-green-600"
                : ""
            }
          `}
        >
          {!errors.password && watch("password")?.length > 0 && (
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="inline mb-1 mr-1" size={14} />
              </motion.span>
            </AnimatePresence>
          )}
          Password must be at least 6 characters long
        </p>
      </div>

      {/* REMEMBER ME AND FORGOT PASSWROD HELP */}
      <div className="w-full flex justify-between items-center h-fit">
        <label className="flex items-center cursor-pointer" htmlFor="cbx-46">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={field.onChange} />
            )}
            />
          <span className="text-sm font-light ml-2">Remember me</span>
        </label>

        <Link href="/forgot-password" className="text-sm font-light">
          Forgot Password?
        </Link>
      </div>

      {/* SUBMIT BUTTON */}
      <MainButton
        className='w-full'
        disabled={(errors.email || errors.password) ? true : false}
        isLoading={isSubmitting}
        type="submit"
      >
        Sign In
      </MainButton>

      <Divider>Or continue with Google</Divider>

      <MainButton
        className='w-full'
        variant='outline'
        animated={false}
        onClick={() => handleLoginWithGoogle()}
      >
        <Image src='/google_logo.png' width={20} height={20} alt='google_logo'/>
        Google
      </MainButton>
    </form>
  )
}

export default SignInForm