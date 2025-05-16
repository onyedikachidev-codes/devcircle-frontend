import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user";
import uiReducer from "./ui";
import recommendationsReducer from "./recommendations";
import notificationsReducer from "./notifications";
import connectionsReducer from "./connections";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "recommendations", "ui", "notifications", "connections"],
};

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  recommendations: recommendationsReducer,
  notifications: notificationsReducer,
  connections: connectionsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export const handleSignOut = () => {
  persistor.purge();
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
