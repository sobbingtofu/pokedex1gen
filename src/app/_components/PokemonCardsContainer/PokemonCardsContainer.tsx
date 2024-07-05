"use client"

import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { fecthPokedex } from "@/app/_api/fetchPokedex"
import { Tpokemon } from "@/app/_types/pokemon.type"

import ErrorMessage from "../ErrorMessage"
import Loader from "../Loader"
import PokemonCard from "../PokemonCard/PokemonCard"

function PokemonCardsContainer() {
  const {
    data: pokedex,
    isLoading,
    isError,
  } = useQuery<Tpokemon[]>({
    queryKey: ["pokedex"],
    queryFn: fecthPokedex,
    gcTime: 8 * 60 * 1000, // 8분
  })

  useEffect(() => {
    console.log(pokedex || "loading")
  }, [pokedex])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <div className="my-[150px] grid w-4/5 gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokedex?.map((pokemon) => {
            return (
              <PokemonCard pokemon={pokemon} key={pokemon.id}></PokemonCard>
            )
          })}
        </div>
      )}
    </>
  )
}

export default PokemonCardsContainer
