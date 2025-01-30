import { Text } from "react-native"

const MainTitle = ({ title }: { title: string }) => {
  return (
    <Text className="text-xl font-semibold text-primaryViolet px-2 py-4 uppercase">
      {title}
    </Text>
  )
}

export default MainTitle
