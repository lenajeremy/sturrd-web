import * as React from 'react'
import { useAppSelector } from '@/hooks'
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'

const UserImage = () => {
    const user = useAppSelector(store => store.user)
    return (
        <Avatar className='w-8 h-8'>
            <AvatarImage src={user.image || '/images/user.jpeg'} />
            <AvatarFallback className='bg-purple-300'>{(user.firstName?.charAt(0) || "") + (user.lastName?.charAt(0) || "")}</AvatarFallback>
        </Avatar>
    )
}

export default UserImage