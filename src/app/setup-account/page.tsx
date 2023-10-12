'use client'

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
    return (
        <div>
            <SturrdLogo />
            <Label>Which of the following best describes you?</Label>
            <Select options={accountTypes} renderLabel={(v) => v.key} renderValue={(v) => v.value} onChange={e => console.log(e)} />
            <Button>Next</Button>
        </div>
    )
}

export default AccountSetupPage