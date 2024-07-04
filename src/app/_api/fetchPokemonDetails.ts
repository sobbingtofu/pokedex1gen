import axios from "axios"

export const fetchPokemonDetails = async (pokemonId: string) => {
  const response = await axios.get(`/api/pokemons/${pokemonId}`)
  return response.data
}

// export const fetchPokemonDetails = async (pokemonId: string) => {
//   const { data } = await axios.get(`/api/pokemon/${pokemonId}`)
//   return data
// }
