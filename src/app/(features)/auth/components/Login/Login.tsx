'use client'

import Button from '@/common/components/atoms/Button'
import React from 'react'
import { Form, Field } from 'react-final-form'
import { useLogin, providers } from '../../hooks/useLogin';
import { GoogleLogin } from './components/GoogleLogin';
import { FacebookLogin } from './components/FacebookLogin'


export const Login = () => {

    const { post } = useLogin(providers.CREDENTIALS)

    return (
        <div>
            <Form
                onSubmit={
                    (values: { email: string; password: string }) => post?.(values)
                }
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name='email'
                            component='input'
                            placeholder='Enter your email'
                        />
                        <Field
                            name='password'
                            component='input'
                            placeholder='Enter your pass'
                        />
                        <Button type='submit' disabled={false}>Submit</Button>
                    </form>
                )}
            />
            <GoogleLogin/>
            <FacebookLogin/>
            
        </div>
    )
}

