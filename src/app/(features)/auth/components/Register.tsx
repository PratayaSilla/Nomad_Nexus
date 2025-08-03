'use client'

import { useAuth } from '@/app/(features)/auth/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
// import { useSearchParams } from 'next/navigation';
import Button from '@/common/components/atoms/Button';
import InputField from '@/common/fields/Input';
import { useRouter } from 'next/navigation'


type userForm = {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    username: string;
};

export const Register = () => {

    const router = useRouter();

    const fields = [
        {
            name: 'email',
            placeholder: 'Email',
            label: "What's your email ?",
            required: true,
            type: 'email',
        },
        {
            name: 'fullName',
            placeholder: 'Full name',
            label: "What's your full name ?",
            required: true,
            type: 'text',
        },
        {
            name: 'username',
            placeholder: 'Username',
            label: 'What do we call you ?',
            required: true,
            type: 'text',
        },
        {
            name: 'password',
            placeholder: 'Password',
            label: 'What shall we keep your password ?',
            required: true,
            type: 'password',
        },
        {
            name: 'confirmPassword',
            placeholder: 'Confirm password',
            label: 'Can you confirm the above password ?',
            required: true,
            type: 'password',
        },
    ];

    const { post, loading, error } = useAuth('register',{ onSuccess : () => router.push('/') })
    const [err, setError] = useState('')

    useEffect(() => {
        setError(error || "")
    }, [error])

    const onSubmit = (values: userForm) => {
        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        post(values);
    };



    return (
        <div className='text-text-primary'>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <div key={field.name} className='my-4'>
                                <InputField  {...field} />
                            </div>
                        ))}
                        {(error || err) && (
                            <p className="text-error text-md mt-3 text-center">{err}</p>
                        )}
                        <div className='flex justify-end'>
                            Already have an account?&nbsp; 
                            <span onClick={() => router.push('')}>Login</span>
                        </div>
                        <Button type='submit' disabled={loading} className='bg-primary w-full mt-4 rounded-lg font-bold'>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                )}
            />
        </div>
    )
}
