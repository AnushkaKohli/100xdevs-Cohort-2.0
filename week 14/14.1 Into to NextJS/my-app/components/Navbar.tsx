'use client';

import React from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter();
    const homeHandler = () => router.push("/");
    const signupHandler = () => router.push("/signup");
    const signinHandler = () => router.push("/signin");
    return (
        <div className="flex justify-center items-center gap-x-8 m-4">
            <button type="button" onClick={homeHandler} className="border border-fuchsia-500 bg-fuchsia-300 px-4 py-2 rounded-full">
                Home
            </button>
            <button type="button" onClick={signupHandler} className="border border-fuchsia-500 bg-fuchsia-300 px-4 py-2 rounded-full">
                Sign up
            </button>
            <button type="button" onClick={signinHandler} className="border border-fuchsia-500 bg-fuchsia-300 px-4 py-2 rounded-full">
                Sign in
            </button>
        </div>
    )
}

export default Navbar
