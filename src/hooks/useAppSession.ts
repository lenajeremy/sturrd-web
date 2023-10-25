import { useEffect } from 'react'
import { UseSessionOptions, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "./redux";
import { updateAppSession } from '@/store/actions';
import { AppSessionType } from '@/types';

const useAppSession = (options?: UseSessionOptions<true>): AppSessionType => {
    const session = useSession(options)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(session)
        dispatch(updateAppSession({ data: session.data, status: session.status }))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    return session
}

export default useAppSession