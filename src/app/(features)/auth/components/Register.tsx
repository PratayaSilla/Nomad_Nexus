'use client'

import { useAuth } from '@/app/(features)/auth/hooks/useAuth'
import React from 'react'
import { Form, Field } from 'react-final-form'
// import { useSearchParams } from 'next/navigation';
import Button from '@/common/components/atoms/Button';
import { useSession } from 'next-auth/react';

export const Register = () => {

    // const searchParams = useSearchParams();
    // const userType = searchParams.get('type');

    const {post,loading} = useAuth('register')

    const session = useSession()
    console.log(session)

  return (
    <div>
        <Form
            onSubmit={(values: { email: string }) => post(values)}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name='email'
                        component='input'
                        placeholder='Enter your email'
                    />
                     <Field
                        name='fullName'
                        component='input'
                        placeholder='Enter your full name'
                    />
                     <Field
                        name='password'
                        component='input'
                        placeholder='Enter your password'
                    />
                    <Button type='submit' disabled={loading}>Submit</Button>
                </form>
            )}
        />
    </div>
  )
}
