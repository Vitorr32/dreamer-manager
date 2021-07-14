import { configureStore } from '@reduxjs/toolkit'

import gameLoopReducer from './game-loop/game-loop.reducer'

export const store = configureStore({
    reducer: {
        gameLoop: gameLoopReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch