import { View, SafeAreaView, ScrollView, RefreshControl } from "react-native"

import { Link } from "expo-router"
import MainTitle from "@/components/shared/main-title"
import FeaturedMovies from "@/components/featured-movies/featured-movies"
import TrendingMovies from "@/components/trending-movies/trending-movies"
import NewMovies from "@/components/new-movies/new-movies"
import { useCallback, useState } from "react"

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])
  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-auto container p-2">
          <View className="flex flex-row justify-between items-center">
            <MainTitle title="პოპულარული ფილმები" />
            <Link
              className="text-primaryViolet underline pr-2"
              href="/all-featured"
            >
              ყველა
            </Link>
          </View>
          <FeaturedMovies />

          <View className="flex flex-row justify-between items-center">
            <MainTitle title="ტრენდული ფილმები" />
            <Link
              className="text-primaryViolet underline pr-2"
              href="/all-trending"
            >
              ყველა
            </Link>
          </View>
          <TrendingMovies />

          <View className="flex flex-row justify-between items-center">
            <MainTitle title="ახალი ფილმები" />
            <Link
              className="text-primaryViolet underline pr-2"
              href="/all-movies"
            >
              ყველა
            </Link>
          </View>
          <NewMovies />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
