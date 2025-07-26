'use client'

import { useEffect } from "react"
import { notify } from "@/common/utils/notify"
import { usePOSTData } from "@/common/hooks/services/methods/useSmartPostMutation"
import { apiUrls } from "@/common/constants/apiURLS"
import { logError } from "@/common/utils/logError"

export const useAuth = (authType: 'login' | 'register') => {

    type LoginBody = { email: string; password: string; };
    type RegisterBody = { email: string; name: string; password: string; };
    type body = LoginBody | RegisterBody;

    const { postData, loading, error } = usePOSTData<body>(apiUrls[authType])

    useEffect(() => {
        if (error) {
            notify.error(`Error ${authType === 'login' ? 'Logging in' : 'Registering'}! Please try again!`)
            logError({
                error: error,
                location: 'src/common/hooks/customHooks/useAuth.ts',
                when: `trying to ${authType} error`
            })
        }
    }, [error, authType])

    return { post: postData, loading }
}

