import { View, Text, FlatList } from "react-native"
import React, { useContext } from "react"

import MovieCard from "@/components/shared/movie-card"
import { FavoritesContext } from "@/context/favorites-context"
import FontAwesome from "@expo/vector-icons/FontAwesome"

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)
  return (
    <View className="my-3">
      {favorites?.length !== 0 ? (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={favorites}
          renderItem={({ item }) => (
            <MovieCard isFullList={true} movie={item} />
          )}
          keyExtractor={(item) => item?.id?.toString()}
        />
      ) : (
        <View className="mt-20">
          <Text className="text-center p-2 text-3xl">ფავორიტები ცარიელია</Text>
          <FontAwesome
            name="history"
            color="#5F44B3"
            size={100}
            className="text-center text-gray-300"
          />
        </View>
      )}
    </View>
  )
}

export default Favorites
