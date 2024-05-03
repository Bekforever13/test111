import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import { reducer as main } from "@/shared/slices/main/index.slice";
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "./index.api"

const reducers = combineReducers({
  // main,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDM) => getDM().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
