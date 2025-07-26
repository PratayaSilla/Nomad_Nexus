
import { logError } from '@/common/utils/logError';
import { signIn } from "next-auth/react";
import { notify } from '@/common/utils/notify';

export enum providers  {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    CREDENTIALS = 'credentials'
  } 
  
export const useLogin = (method: providers) => {
    
    if (method === providers.CREDENTIALS) {
        const post = async (values: { email: string; password: string }) => {
            try {
                const result = await signIn(method, {
                    email: values.email,
                    password: values.password,
                    redirect: false
                });

                    if (result?.ok) {
                        notify.success('Login successful!')
                    }
                    if (result?.error) {
                        notify.error(result?.error)
                    }      
            } catch (error) {
                logError({
                    error : error,
                    location : "src/app/(features)/auth/hooks/useLogin.ts",
                    when : 'loggin in user'
                })            
            }
        }

        return { post }
    }

    if (method === providers.GOOGLE) {

        const signInWithGoogle = async () => {
            try {
                const res = await signIn(providers.GOOGLE)
                if (res?.ok) {
                    notify.success('Google login successful!')
                }
                if (res?.error) {
                    notify.error(res.error)
                }
            } catch (error) {
                logError({
                    error: error,
                    location: "src/app/(features)/auth/hooks/useLogin.ts",
                    when: 'logging in with Google'
                })
            }
        }

        return { signInWithGoogle }
    }

    if (method === providers.FACEBOOK) {
        const signInWithFacebook = async () => {
            try {
                const res = await signIn(providers.FACEBOOK)
                if (res?.ok) {
                    notify.success('Google login successful!')
                }
                if (res?.error) {
                    notify.error(res.error)
                }
            } catch (error) {
                logError({
                    error: error,
                    location: "src/app/(features)/auth/hooks/useLogin.ts",
                    when: 'logging in with Google'
                })
            }
        }

        return { signInWithFacebook }
    }

    return { post: async () => {}, signInWithGoogle: async () => {}, signInWithFacebook : async () => {} }
}

