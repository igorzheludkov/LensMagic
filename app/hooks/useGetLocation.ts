import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { ILocation } from 'app/types/IPost'

export default function useGetLocation() {
  const [location, setLocation] = useState<ILocation>({ latitude: 0, longitude: 0 })
  const [isGranted, setIsGranted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    async function getLocation() {
      setIsLoading(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Low
        })
        setIsGranted(true)
        setLocation({ latitude: coords.latitude, longitude: coords.longitude })
        setIsLoading(false)
        setIsSuccess(true)
      }
    }

    getLocation()
  }, [])

  return { location, isGranted, isLoading, isSuccess }
}
