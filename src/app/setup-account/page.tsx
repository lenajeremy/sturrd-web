'use client'

import * as React from 'react'
import SturrdLogo from "@/assets/logo"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { UserTypes } from "@prisma/client"

const accountTypes = [
    {
        key: "School Owner / Administrator",
        value: UserTypes.SCHOOL_ADMIN
    },
    {
        key: "Student",
        value: UserTypes.STUDENT
    },
    {
        key: "Parent/Guardian",
        value: UserTypes.PARENT
    }
]


const AccountSetupPage = () => {

    const [ accountType, setAccountType ] = React.useState<typeof UserTypes[keyof typeof UserTypes]>()
    const [loading, setLoading] = React.useState<boolean>(false)

    const setAccountTypeRequest = async () => {
        setLoading(true)
        const res = await fetch('/api/auth/set-account-type', { method: "POST", body: JSON.stringify({ accountType }) })
        const data = await res.json()
        console.log(data)
        setLoading(false)
    }

    

    return (
        <div>
            <SturrdLogo />
            <Label>Which of the following best describes you?</Label>
            <Select 
                options={accountTypes} 
                renderLabel={(v) => v.key} 
                renderValue={(v) => v.value} 
                onChange={v => setAccountType(v)} />
            <Button loading = {loading} onClick={setAccountTypeRequest}>Next</Button>
        </div>
    )
}

export default AccountSetupPage