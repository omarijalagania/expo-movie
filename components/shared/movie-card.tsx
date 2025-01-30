import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { MovieT } from "@/types/responses"
import { Link } from "expo-router"

import FontAwesome from "@expo/vector-icons/FontAwesome"
import { FavoritesContext } from "@/context/favorites-context"

const MovieCard = ({
  movie,
  isFullList,
}: {
  movie: MovieT
  isFullList: boolean
}) => {
  const { width } = Dimensions.get("window")
  const [isFavorite, setIsFavorite] = useState(false)
  const favoritesContext = useContext(FavoritesContext)

  if (!favoritesContext) {
    throw new Error("FavoritesContext is undefined")
  }
  const { toggleFavorite, favorites } = favoritesContext

  useEffect(() => {
    const isFavorite = favorites?.some((fav) => fav.id === movie.id)
    setIsFavorite(isFavorite)
  }, [favorites, movie.id])

  const handleToggleFavorite = async () => {
    await toggleFavorite(movie)
  }

  return (
    <Link
      asChild
      href={`/${movie?.id}`}
      style={{
        width: width * 0.45,
        height: 230,
        margin: isFullList ? 10 : 0,
      }}
      className="relative z-10"
    >
      <Pressable>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          style={{ width: width * 0.45, height: 230 }}
          className="rounded-lg"
        />

        <TouchableOpacity
          className="absolute top-2 z-40 right-2 m-2"
          onPress={handleToggleFavorite}
        >
          <FontAwesome
            size={24}
            name="heart"
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>

        <View
          style={{
            width: width * 0.45,
          }}
          className="mt-2 p-2 bg-primaryViolet absolute bottom-0 rounded-lg"
        >
          <Text className="text-white text-lg text-center line-clamp-1">
            {movie?.title}
          </Text>
        </View>
      </Pressable>
    </Link>
  )
}

export default MovieCard
