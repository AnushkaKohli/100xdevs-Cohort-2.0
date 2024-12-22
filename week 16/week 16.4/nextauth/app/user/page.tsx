import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '../lib/auth';

const page = async () => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    console.log("Session: ", session)
    return (
        <div>

            Server Component
            <br />
            {JSON.stringify(session?.user)}
        </div>
    )
}

export default page
