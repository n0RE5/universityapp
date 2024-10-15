import { useState } from "react";

export const useFetching = (callback: (...args: never[]) => void, onError?: (e: unknown) => void, onFinally?: () => void) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetching = async (...args: never[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch(e: unknown) {
            onError?.(e)
            setError((e as Error)?.message)
        } finally {
            onFinally?.()
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] as const
}
