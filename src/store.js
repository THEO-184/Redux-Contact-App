import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./redux/reducers/contactReducer";
export const store = configureStore({
	reducer: {
		contacts: contactReducer,
	},
});
