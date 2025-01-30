import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import "../global.css"
import { useColorScheme } from "@/hooks/useColorScheme"
import { FavoritesProvider } from "@/context/favorites-context"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen
            name="[id]/index"
            options={{ title: "ფილმის დეტალები", headerBackTitle: "მთავარი" }}
          />

          <Stack.Screen
            name="all-featured/index"
            options={{ title: "ყველა ფილმი", headerBackTitle: "მთავარი" }}
          />

          <Stack.Screen
            name="all-trending/index"
            options={{ title: "ყველა ფილმი", headerBackTitle: "მთავარი" }}
          />

          <Stack.Screen
            name="all-movies/index"
            options={{ title: "ყველა ფილმი", headerBackTitle: "მთავარი" }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
