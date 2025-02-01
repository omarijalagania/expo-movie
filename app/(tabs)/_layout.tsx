import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#5F44B3" }}>
      <StatusBar style="auto" />
      <Tabs.Screen
        name="(home)"
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#5F44B3" },
          title: "მთავარი",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#5F44B3" },
          title: "ფავორიტები",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="heart" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
