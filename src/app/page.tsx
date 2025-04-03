'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import x from '@/styles/app.module.css'
import Appbody from '@/components/app.body'
import { useEffect } from "react"
import useSWR from "swr"


export default function Home() {

  const fetcher = (url: string) => fetch(url)
    .then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  console.log("getdata", data)
  if (!data) {
    return <div>loading...</div>
  }
  return (
    <div>
      <div>
        {data?.length}
      </div>
      <Appbody
        blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </div>
  )
}