import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { MovieT } from "@/types/responses"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { FavoritesContext } from "@/context/favorites-context"

const MovieDetails = () => {
  const [movie, setMovie] = useState<MovieT>()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useLocalSearchParams<{ id: string }>()

  const [isFavorite, setIsFavorite] = useState(false)
  const favoritesContext = useContext(FavoritesContext)

  if (!favoritesContext) {
    throw new Error("FavoritesContext is undefined")
  }
  const { toggleFavorite, favorites } = favoritesContext

  useEffect(() => {
    const isFavorite = favorites?.some((fav) => fav.id === movie?.id)
    setIsFavorite(isFavorite)
  }, [favorites, movie?.id])

  const handleToggleFavorite = async () => {
    if (movie) {
      await toggleFavorite(movie)
    }
  }

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
            },
          },
        )
        const data = await response.json()
        setMovie(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    getMovie()
  }, [])

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`,
        }}
        style={{ width: "100%", height: 300 }}
      />

      <TouchableOpacity
        className="absolute top-3 z-40 right-2 m-2"
        onPress={handleToggleFavorite}
      >
        <FontAwesome
          size={24}
          name="heart"
          color={isFavorite ? "red" : "white"}
        />
      </TouchableOpacity>

      <Text className="text-black dark:text-white font text-3xl p-3">
        {movie?.title} ({movie?.release_date})
      </Text>
      <View className="py-5 px-3">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold pb-3 text-black dark:text-white text-lg uppercase">
            Rating:
          </Text>
          <Text className="text-black dark:text-white">
            {" "}
            {movie?.vote_average}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold pb-3 text-lg text-black dark:text-white uppercase">
            Popularity:
          </Text>
          <Text className="text-black dark:text-white">
            {" "}
            {movie?.popularity}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold pb-3 text-lg text-black dark:text-white uppercase">
            Vote count:{" "}
          </Text>
          <Text className="text-black dark:text-white">
            {" "}
            {movie?.vote_count}
          </Text>
        </View>

        <Text className="text-black text-justify font-normal text-md leading-5 dark:text-white">
          {movie?.overview}
        </Text>
      </View>
    </ScrollView>
  )
}

export default MovieDetails
