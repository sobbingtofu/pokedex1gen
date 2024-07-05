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
          {"no." + zeroPad(pokemonDetails?.id, 3)}
        </p>
        {/* 이름 */}
        <p id="pokemonName" className="mt-4 text-5xl font-black">
          {pokemonDetails?.korean_name}
        </p>
        {/* 이미지 */}
        <div className="mt-[30px] flex flex-col items-center justify-center gap-y-12">
          <div
            id="pokemonAnimated"
            className="relative aspect-square h-[120px] sm:h-[180px] md:h-[200px] lg:h-[200px] xl:h-[200px]"
          >
            <Image
              fill
              alt={pokemonDetails?.korean_name || ""}
              src={
                pokemonDetails?.sprites?.other?.showdown?.front_default ||
                pokemonDetails?.sprites?.front_default ||
                ""
              }
              className="object-contain"
              unoptimized
              priority={false}
            />
          </div>
          <div
            id="pokemonImage"
            className="relative aspect-square h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[400px]"
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
              priority={false}
            />
          </div>
        </div>
        {/* 타입 */}
        <div id="pokemonType" className="flex items-center justify-start gap-3">
          <p className="mr-2 text-2xl font-black">타입: </p>
          {koreanTypes?.map((type) => {
            return (
              <div
                className={`${type === "불꽃" ? "bg-red-600" : type === "비행" ? "bg-cyan-300" : type === "노말" ? "bg-gray-400" : type === "격투" ? "bg-orange-600" : type === "독" ? "bg-purple-900" : type === "땅" ? "bg-yellow-900" : type === "바위" ? "bg-yellow-700" : type === "벌레" ? "bg-lime-400" : type === "고스트" ? "bg-purple-950" : type === "강철" ? "bg-slate-700" : type === "물" ? "bg-cyan-600" : type === "풀" ? "bg-green-600" : type === "전기" ? "bg-yellow-500" : type === "에스퍼" ? "bg-pink-600" : type === "얼음" ? "bg-teal-400" : type === "드래곤" ? "bg-indigo-700" : type === "악" ? "bg-black" : type === "페어리" ? "bg-pink-500" : "bg-slate-700"} rounded-xl px-2 py-1 font-semibold text-white`}
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
          <div className="xs:grid-cols-1 grid items-center gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-7">
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
              <div className="text-lg font-bold text-black">
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
          <div className="my-[20px] grid gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {pokemonDetails?.moves?.map((moveObj) => {
              return (
                <div key={moveObj.move.korean_name} className="text-center">
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
