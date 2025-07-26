import React from 'react'
import Button from '../../../../../../common/components/atoms/Button'
import { providers, useLogin } from '../../../hooks/useLogin'


export const FacebookLogin = () => {

    const { signInWithFacebook } = useLogin(providers.FACEBOOK)

  return (
    <Button onClick={() => signInWithFacebook()}>
        Login with Facebook 
    </Button>
  )
}
