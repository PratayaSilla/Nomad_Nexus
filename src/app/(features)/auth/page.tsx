'use client'

import React, { useState, useEffect } from 'react';
import { Login } from './components/Login/Login';
import { Register } from './components/Register';
import Button from '@/common/components/atoms/Button';
import { GoogleLogin } from './components/Login/components/GoogleLogin';
import { FacebookLogin } from './components/Login/components/FacebookLogin';
import { useRouter, useSearchParams } from 'next/navigation';


export default function Auth() {

  const [formType, setFormType] = useState('register')

  const searchParams = useSearchParams()
    const router = useRouter()
    const error = searchParams.get('error')
        useEffect(() => {
            if (error) {
              router.push('/')
            }
          }, [error,router])

  return (
    <>
      <div className='flex gap-2 md:gap-4 justify-center w-full mt-12 mb-4'>
        <Button
          onClick={() => setFormType('login')}
          className='border-solid border-2 rounded-lg border-text-primary w-full'
        >Switch Login</Button>
        <Button
          onClick={() => setFormType('register')}
          className='bg-primary rounded-lg w-full'
        >Switch register</Button>
      </div>
      <div className='flex gap-2 md:gap-12'>
        <GoogleLogin />
        <FacebookLogin />
      </div>
      <div className='text-center mt-6 '>OR</div>
      {formType === 'login' ? <Login /> : <Register />}

    </>
  )
};

