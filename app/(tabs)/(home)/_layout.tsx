import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="all-featured/index"
        options={{ title: "ყველა ფილმი", headerBackTitle: "მთავარი" }}
      />
    </Stack>
  )
}

export default HomeLayout
