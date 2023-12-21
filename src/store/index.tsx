import { configureStore } from '@reduxjs/toolkit'

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export const configureStore makeStore = () => {
    return configureStore({
        reducer: {}
    })
}