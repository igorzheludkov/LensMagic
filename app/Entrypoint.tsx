import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { store, persistor } from 'app/store/store'
import RootNavigation from 'app/navigation/RootNavigation'

export default function Entrypoint(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}
