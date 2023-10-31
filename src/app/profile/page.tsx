"use client";

import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function page() {
  const [data, setData] = React.useState<any>({ username: "", email: "", id: "" });
  const route = useRouter();
  const logOut = () => {
    try {
      const response = axios.get("/api/users/logout");
      route.push("/login");
      return response;
    }
    catch (error) {
      return alert("error logging out: " + error);
    }
  }

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/user");
      console.log(response.data.user);
      setData(response.data.user);
    }
    catch (error) {
      console.log(`error fetching user data from backend: ${error}`);
    }
  }


  useEffect(() => {
    getUserDetails();

  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
      <div>
        <div className='bg-[#667589] space-y-[4rem] text-[2rem] px-[2rem] py-[1rem]'>
          <div>Username: {data.username}</div>
          <div>Email: {data.email}</div>
          <div className='bg-[#7e63f5] rounded-md flex justify-center hover:bg-[#765edf]'>_id:<Link href={`/profile/${data._id}`}>{data._id}</Link></div>
          <button onClick={logOut} className='bg-[#01134C] text-white px-2 rounded-md'>Logout</button>
        </div>
      </div>
    </div>
  )
}
