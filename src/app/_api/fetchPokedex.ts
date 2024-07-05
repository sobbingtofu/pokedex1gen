// import { NextResponse } from "next/server"
import axios from "axios"

import { Tpokemon } from "../_types/pokemon.type"

// export const fecthPokedex = async () => {
//   const { data } = await axios.get("/api/pokemons")
//   return data
// }

export const fecthPokedex = async () => {
  const TOTAL_POKEMON = 30

  const allPokemonPromises = Array.from(
    { length: TOTAL_POKEMON },
    (_, index) => {
      const id = index + 1
      return Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ])
    }
  )

  const allPokemonResponses = await Promise.all(allPokemonPromises)

  const allPokemonData: Tpokemon[] = allPokemonResponses.map(
    ([response, speciesResponse], index) => {
      const koreanName = speciesResponse.data.names.find(
        (name: any) => name.language.name === "ko"
      )
      return { ...response.data, korean_name: koreanName?.name || null }
    }
  )

  return allPokemonData
  // return NextResponse.json(allPokemonData)
}
