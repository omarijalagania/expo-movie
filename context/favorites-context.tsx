import { MovieT } from "@/types/responses"
import React, { createContext, useState, ReactNode, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
interface FavoritesContextProps {
  favorites: MovieT[]
  toggleFavorite: (movie: MovieT) => Promise<MovieT[]>
  getFavorites: () => Promise<MovieT[]>
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  toggleFavorite: async () => [],
  getFavorites: async () => [],
})

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const FAVORITES_KEY = "favorite_products"
  const [favorites, setFavorites] = useState<MovieT[]>([])

  //   useEffect(() => {
  //     const clearFavorites = async () => {
  //       try {
  //         const favorites = await AsyncStorage.removeItem(FAVORITES_KEY)
  //       } catch (error) {
  //         console.error("Error getting favorites", error)
  //       }
  //     }
  //     clearFavorites()
  //   }, [])

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY)
        if (favorites) {
          setFavorites(JSON.parse(favorites))
        }
      } catch (error) {
        console.error("Error getting favorites", error)
      }
    }
    getFavorites()
  }, [])

  const saveFavorites = async (favorites: MovieT[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      setFavorites(favorites)
    } catch (error) {
      console.error("Error saving favorites", error)
    }
  }

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY)
      return jsonValue ? JSON.parse(jsonValue) : []
    } catch (error) {
      console.error("Error getting favorites", error)
      return []
    }
  }

  const toggleFavorite = async (product: MovieT) => {
    const productId = product.id
    try {
      const newFavorites = favorites.some(
        (fav: { id: number }) => fav.id === productId,
      )
        ? favorites.filter((movie) => movie.id !== productId)
        : [...favorites, product]

      saveFavorites(newFavorites)
      return newFavorites
    } catch (error) {
      console.error("Error toggling favorite", error)
      return []
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        getFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
