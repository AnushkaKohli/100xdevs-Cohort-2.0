"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState, MouseEventHandler } from "react";
import axios from "axios";
import { signup } from "@/app/actions/user";

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function LabelledInput ({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

const Auth = ({ authTitle }: { authTitle: string }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const onClick: MouseEventHandler<HTMLButtonElement> = async () => {
        // const response = await axios.post(`http://localhost:3000/api/user/${authTitle.replace(/\s+/g, '').toLowerCase()}`, {
        //     username, password,
        // });

        // --------Using Server Actions--------
        const response = await signup(username, password);
        // router.push("/");
    }
    return (
        <div className="flex justify-center flex-col mt-16">
            <div className="flex justify-center">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                    <div>
                        <div className="px-10">
                            <div className="text-3xl font-extrabold">
                                {authTitle}
                            </div>
                        </div>
                        <div className="pt-2">
                            <LabelledInput label="Username" placeholder="anushka@gmail.com" onChange={(e) => setUsername(e.target.value)} />
                            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => setPassword(e.target.value)} />
                            <button type="button" onClick={onClick} className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{authTitle}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
