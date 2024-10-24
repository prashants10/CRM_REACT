import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import ticketSliceReducer from "./slices/TicketSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    tickets: ticketSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
