import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import gameLoopReducer from './game-loop/game-loop.reducer'

export default configureStore({
    reducer: {
        gameLoop: gameLoopReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger)
})