import { View, Dimensions, ScrollView } from "react-native"

const MovieCardSkeleton = ({
  isFullList,
  length = 1,
}: {
  isFullList: boolean
  length: number
}) => {
  const array = Array.from({ length })

  const { width } = Dimensions.get("window")

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      centerContent={true}
      horizontal
    >
      {array.map((_, index) => (
        <View
          key={index}
          className="bg-gray-300 rounded-lg animate-pulse"
          style={{
            width: width * 0.45,
            height: 230,
            margin: isFullList ? 10 : 0,
          }}
        />
      ))}
    </ScrollView>
  )
}

export default MovieCardSkeleton
