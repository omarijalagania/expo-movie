import { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import FeaturedCard from "./trending-card"
import { MovieT } from "@/types/responses"
import TrendingCard from "./trending-card"

const FeaturedMovies = () => {
  const [movies, setMovies] = useState<MovieT[]>([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
            },
          },
        )
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error(error)
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
      {movies?.splice(0, 4)?.map((movie) => (
        <View key={movie.id} className="px-2">
          <TrendingCard movie={movie} />
        </View>
      ))}
    </ScrollView>
  )
}

export default FeaturedMovies
