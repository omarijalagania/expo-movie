import { useEffect, useState } from "react"
import { View, ScrollView } from "react-native"
import { MovieT } from "@/types/responses"
import MovieCard from "../shared/movie-card"
import MovieCardSkeleton from "../shared/movie-card-skeleton"
const FeaturedMovies = () => {
  const [movies, setMovies] = useState<MovieT[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
            },
          },
        )
        const data = await response.json()
        setMovies(data.results)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    getMovies()
  }, [])
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      centerContent={true}
      horizontal
    >
      {isLoading ? (
        <MovieCardSkeleton length={3} isFullList={false} />
      ) : (
        movies?.splice(0, 4)?.map((movie) => (
          <View key={movie.id} className="px-2">
            <MovieCard isFullList={false} movie={movie} />
          </View>
        ))
      )}
    </ScrollView>
  )
}

export default FeaturedMovies
