import { MovieT } from "@/types/responses"
import { useEffect, useState } from "react"
import { View, FlatList } from "react-native"
import MovieCard from "../shared/movie-card"
import MovieCardSkeleton from "../shared/movie-card-skeleton"
import { skeletonNumber } from "@/utils"

const AllNewMovies = () => {
  const [allMovies, setAllMovies] = useState<MovieT[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const skeletonArr = skeletonNumber(8)
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
            },
          },
        )
        const data = await response.json()
        setAllMovies(data.results)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    getMovies()
  }, [])

  return (
    <View className="mx-auto my-3">
      {isLoading ? (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={skeletonArr}
          renderItem={() => <MovieCardSkeleton length={8} isFullList={true} />}
          keyExtractor={(item) => item.toString()}
        />
      ) : (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={allMovies}
          renderItem={({ item }) => (
            <MovieCard isFullList={true} movie={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  )
}

export default AllNewMovies
