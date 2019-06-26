import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import Navigator from './src/Navigator'

import storeConfig from './src/store/storeConfig'

import axios from 'axios'

axios.defaults.baseURL = 'https://lambe-lambe-ricardo.firebaseio.com/'

const store = storeConfig()
const Redux = () => (
    <Provider store={store} >
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
