"use client";

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';

const Appbar = () => {
    const session = useSession();
    return (
        <div>
            <button onClick={() => {
                signIn()
            }}>
                Signin
            </button>
            <br />
            <button onClick={() => {
                signOut()
            }}>
                Sign out
            </button>
            <br />
            {JSON.stringify(session)}
        </div>
    )
}

export default Appbar
