'use client'
import type { Metadata } from 'next'
import Link from "next/link"
import { useState, } from 'react'
import { useRouter } from 'next/navigation';
import { object, string, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NextRequest } from 'next/server'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { SessionForm } from '../types'


export const metadata: Metadata = {
  title: 'Login',
}
const sessionSchema: ZodType<SessionForm> = object({
  email: string({
    required_error: "이메일 주소를 입력하세요.",
  }).email("이메일 형태에 맞게 입력하세요."),
  password: string({
    required_error: "비밀번호를 입력하세요",
  }),
});


export default function LoginPage(req: NextRequest) {

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || " "

  const { register, formState: { errors }, handleSubmit, reset } = useForm<SessionForm>({ resolver: zodResolver(sessionSchema), });

  const googleLogin = () => {
    signIn('google', { callbackUrl })
  }

  async function onSubmit(values: SessionForm): Promise<void> {
    try {

      await signIn("credentials", { callbackUrl, redirect: true, email: values.email, password: values.password })

    } catch (error: any) {
      alert('login error:' + JSON.stringify(error) + '관리자에게 문의 바랍니다.')
    }
  }

  return (
    <>
     <h1>login Page</h1>
    </>

  )
}