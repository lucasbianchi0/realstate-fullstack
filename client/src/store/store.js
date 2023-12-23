// store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/UserSlice.js'; 
import propertiesSlice from './properties/propertiesSlice.js'; // Asegúrate de que la ruta del archivo sea correcta
import { setupListeners } from '@reduxjs/toolkit/query';
import { propertiesAPI } from './properties/api/properties.js';

export const store = configureStore({
  reducer: {
    user: userSlice,
    properties: propertiesSlice,
    [propertiesAPI.reducerPath]: propertiesAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesAPI.middleware),
});

setupListeners(store.dispatch);
