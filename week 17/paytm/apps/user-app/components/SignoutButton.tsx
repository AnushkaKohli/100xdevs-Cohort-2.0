"use client";

import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@repo/ui/button'

const SignoutButton = () => {
    return (
        <div>
            <Button onClick={() => signOut()}>
                Sign Out
            </Button>
        </div>
    )
}

export default SignoutButton