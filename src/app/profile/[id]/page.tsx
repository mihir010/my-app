import React from 'react'

export default function page({params}:any) {
  return (
    <>
    <p>this is user ${params.id}</p>
    </>
  )
}
