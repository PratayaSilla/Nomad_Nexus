'use client'

import Button from '@/common/components/atoms/Button'
import React from 'react'
import { useLogin, providers } from '../../../hooks/useLogin'


export const GoogleLogin = () => {

    const {signInWithGoogle} = useLogin(providers.GOOGLE)

  return (
    <Button onClick={() => signInWithGoogle?.()}>
        Login with Google
    </Button>
  )
}

