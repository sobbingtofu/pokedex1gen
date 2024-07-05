import React, { PropsWithChildren } from "react"
import Image from "next/image"
import Link from "next/link"

import { pokemonCardprops } from "@/app/_types/pokemonCardprops.type"

function PokemonCard({ pokemon }: PropsWithChildren<pokemonCardprops>) {
  function zeroPad(num: number, count: number): string {
    let numZeropad = num + ""
    while (numZeropad.length < count) {
      numZeropad = "0" + numZeropad
    }
    return numZeropad
  }
  return (
    <Link href={`/pokemon/${pokemon.id}`} scroll={true}>
      <div className="flex h-max cursor-pointer flex-col items-center justify-start gap-4 rounded-3xl bg-zinc-50 p-[40px] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl">
        <div className="relative z-0 aspect-square h-[180px] w-[180px]">
          <Image
            fill
            alt={pokemon.korean_name}
            src={pokemon.sprites.front_default}
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        <p>{"no." + zeroPad(pokemon.id, 3)}</p>
        <p className="text-xl font-black">{pokemon.korean_name}</p>
      </div>
    </Link>
  )
}

export default PokemonCard
