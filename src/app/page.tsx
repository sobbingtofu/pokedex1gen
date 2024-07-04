"use client"

import { useEffect } from "react"
import axios from "axios"

export default function Home() {
  const fecthData = async () => {
    const { data } = await axios.get("http://localhost:3000/api/pokemons")
    console.log(data)
  }
  useEffect(() => {
    fecthData()
  })

  return <div className="min-h-screen bg-slate-600">asdfasd</div>
}
