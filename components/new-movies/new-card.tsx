import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { MovieT } from "@/types/responses"
import { Link } from "expo-router"
import { FavoritesContext } from "@/context/favorites-context"
import FontAwesome from "@expo/vector-icons/FontAwesome"

const NewCard = ({ movie }: { movie: MovieT }) => {
  const { width } = Dimensions.get("window")
  const [isFavorite, setIsFavorite] = useState(false)
  const favoritesContext = useContext(FavoritesContext)

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
      style={{ width: width * 0.35, height: 170 }}
      className="relative mb-4 z-10"
    >
      <Pressable>
        <View className="relative m-3">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={{ width: width * 0.3, height: 170 }}
            className="object-cover rounded-lg"
          />

          <TouchableOpacity
            className="absolute top-1 z-40 right-1 m-2"
            onPress={handleToggleFavorite}
          >
            <FontAwesome
              size={22}
              name="heart"
              color={isFavorite ? "red" : "white"}
            />
          </TouchableOpacity>

          <View className="mt-2 p-2 bg-primaryViolet w-full absolute bottom-0 rounded-lg">
            <Text className="text-white text-lg text-center line-clamp-1">
              {movie.title}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}

export default NewCard
