"use client";

import React from 'react'
import Image from 'next/image';
import sideimg from '../../assets/sideimg.jpg';
import react from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function signup() {
    const router = useRouter();
    const [creds, setCreds] = react.useState({
        email:"",
        password:""
    });

    const loginFunc = async () =>{
        const response = await axios.post("/api/users/login", creds);

        alert(response.data.message);

        if(response.data.success)
        {
            router.push("/profile");
        }
    }

    return (
        <>
            <div className='w-[100vw] h-[100vh]'>
                <div className='relative top-[25%]'>
                    <div className='relative flex justify-between bg-gray-800 max-w-prose mx-auto'>
                        <div className='my-[4rem] flex flex-col ml-[4rem] items-center justify-center space-y-[3rem]'>
                            <div>
                                <h1 className='font-semibold text-white'>Login</h1>
                            </div>

                            <div>
                                <input type="text" id='email' placeholder='email' onChange={(e)=>setCreds({...creds, email:e.target.value})}/>
                            </div>

                            <div>
                                <input type="text" id='password' placeholder='password' onChange={(e)=>setCreds({...creds, password:e.target.value})}/>
                            </div>

                            <div>
                                <button className='bg-[#01134C] text-white px-[1.2rem] py-[0.2rem] rounded-md' onClick={loginFunc}>Login</button>
                            </div>

                        </div>
                        <div className='relative basis-[40%]'>
                            <Image src={sideimg} alt='' layout='fill' style={{objectFit:'cover'}} />
                        </div>
                    </div>
                </div>
            </div>



            {/* <div className='flex'>
                <div className='relative flex bg-red-200 justify-center basis-[50%]'>
                    <div>
                        <div>
                            <input type="text" placeholder='username'/>
                        </div>
                        <div>
                            <input type="text" placeholder='email'/>
                        </div>
                        <div>
                            <input type="text" placeholder='password'/>
                        </div>
                    </div>
                    <div className="relative basis-[40%]">
                        <Image src={sideimg} layout='fill' objectFit='cover' alt='' />
                    </div>
                </div>
            </div> */}
        </>
    )
}

// <div className='max-w-7xl mx-auto py-12'>
//     <h1 className='text-center font-semibold text-4xl mb-6'>Home Page</h1>
//     <div className='relative flex bg-red-200'>
//         <p className='max-w-prose py-12 px-4'>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat molestias atque suscipit culpa, officiis inventore, sapiente veritatis ea consequuntur nulla similique et necessitatibus, a beatae. Perferendis architecto iste ipsum eum!
//         </p>
//         <div className="relative basis-[40%]">
//             <Image src={sideimg} layout='fill' objectFit='cover' alt=''/>
//         </div>
//     </div>
// </div>