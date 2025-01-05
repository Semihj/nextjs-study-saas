import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { tokenReducer} from "./token";

const persistConfig = {
  key: 'root',
  storage,
};


const rootReducer = combineReducers({
  token: tokenReducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    
  });
  

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
