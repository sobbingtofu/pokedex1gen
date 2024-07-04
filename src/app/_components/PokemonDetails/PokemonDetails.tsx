"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { fecthPokedex } from "@/app/_api/fetchPokedex"
import { fetchPokemonDetails } from "@/app/_api/fetchPokemonDetails"
import { Tpokemon } from "@/app/_types/pokemon.type"
import { TpokemonDetail } from "@/app/_types/pokemonDetail.type"
import { TpokemonType } from "@/app/_types/pokemonType.type"

import ErrorMessage from "../ErrorMessage"
import Loader from "../Loader"

function PokemonDetails() {
  const params: { pokemonId: string } = useParams()
  const pokemonId: string = params.pokemonId

  function zeroPad(num: number | undefined, count: number): string {
    let numZeropad = num + ""
    while (numZeropad.length < count) {
      numZeropad = "0" + numZeropad
    }
    return numZeropad
  }

  const {
    data: pokemonDetails,
    isLoading: isLoading,
    isError: isError,
  } = useQuery<TpokemonDetail>({
    queryKey: [`pokemonDetail${pokemonId}`, pokemonId],
    queryFn: () => fetchPokemonDetails(pokemonId),
    gcTime: 10 * 60 * 1000, // 2분
  })

  if (isLoading) {
    return <Loader />
  } else if (isError) {
    return <ErrorMessage />
  } else {
    console.log(pokemonDetails)

    const koreanAbilities =
      pokemonDetails?.abilities?.map((abilityObj) => {
        return {
          abilityKoreanName: abilityObj.ability?.korean_name,
          isHidden: abilityObj.is_hidden,
        }
      }) || []

    const koreanTypes =
      pokemonDetails?.types?.map((typeObj) => {
        return typeObj.type?.korean_name
      }) || []

    let totalBaseStats = 0

    pokemonDetails?.stats.forEach((stat) => {
      totalBaseStats += stat.base_stat
    })

    return (
      <div className="my-[80px] flex h-max w-3/5 flex-col items-center justify-start gap-2 rounded-3xl bg-zinc-50 p-[40px] py-[30px] shadow-lg">
        {/* 도감번호 */}
        <p id="pokemonId" className="text-lg font-bold text-stone-500">
          {"no." + pokemonDetails?.id}
        </p>
        {/* 이름 */}
        <p id="pokemonName" className="mt-4 text-5xl font-black">
          {pokemonDetails?.korean_name}
        </p>
        {/* 이미지 */}
        <div
          id="pokemonImage"
          className="relative aspect-square h-[400px] w-[400px]"
        >
          <Image
            fill
            alt={pokemonDetails?.korean_name || ""}
            src={
              pokemonDetails?.sprites?.other?.["official-artwork"]
                ?.front_default ||
              pokemonDetails?.sprites?.front_default ||
              ""
            }
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        {/* 타입 */}
        <div id="pokemonType" className="flex items-center justify-start gap-3">
          <p className="mr-2 text-2xl font-black">타입: </p>
          {koreanTypes?.map((type) => {
            return (
              <div
                className="rounded-xl bg-black px-2 py-1 font-semibold text-white"
                key={type}
              >
                {type}
              </div>
            )
          })}
        </div>
        {/* 특성 */}
        <div
          id="pokemonAbilities"
          className="flex items-center justify-start gap-3"
        >
          <p className="mr-2 text-2xl font-black">특성: </p>
          {koreanAbilities?.map((ability) => {
            if (ability.isHidden) {
              return (
                <div
                  className="rounded-xl bg-teal-500 px-2 py-1 font-semibold text-white"
                  key={ability.abilityKoreanName}
                >
                  {ability.abilityKoreanName}
                </div>
              )
            } else {
              return (
                <div
                  className="rounded-xl bg-slate-500 px-2 py-1 font-semibold text-white"
                  key={ability.abilityKoreanName}
                >
                  {ability.abilityKoreanName}
                </div>
              )
            }
          })}
        </div>
        {/* 종족치 */}
        <div
          id="pokemonStats"
          className="mt-3 flex flex-col items-center justify-center gap-5"
        >
          <p className="mt-6 text-2xl font-black">종족치</p>
          <div className="flex items-center gap-4">
            {pokemonDetails?.stats?.map((statObj) => {
              return (
                <div
                  key={statObj.stat?.name}
                  className="flex w-[65px] flex-col items-center gap-2"
                >
                  <div className="font-bold text-neutral-500">
                    {statObj.stat?.name === "hp"
                      ? "HP"
                      : statObj.stat?.name === "attack"
                        ? "공격"
                        : statObj.stat?.name === "defense"
                          ? "방어"
                          : statObj.stat?.name === "special-attack"
                            ? "특공"
                            : statObj.stat?.name === "special-defense"
                              ? "특방"
                              : "스피드"}
                  </div>
                  <div className="font-bold text-neutral-500">
                    {statObj.base_stat}
                  </div>
                </div>
              )
            })}
            <div className="ml-1 flex w-[65px] flex-col items-center gap-2">
              <div className="text-lg font-bold">총계</div>
              <div className="text-lg font-bold text-teal-500">
                {totalBaseStats}
              </div>
            </div>
          </div>
        </div>
        {/* 배울 수 있는 기술 */}
        <div
          id="pokemonStats"
          className="mt-3 flex flex-col items-center justify-center gap-5"
        >
          <p className="mt-6 text-2xl font-black">습득 가능 기술</p>
          <div className="flex flex-col items-center gap-4">
            {pokemonDetails?.moves?.map((moveObj) => {
              return (
                <div key={moveObj.move.korean_name}>
                  {moveObj.move.korean_name}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default PokemonDetails
