import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const contactReducer = createSlice({
	name: "contact",
	initialState,
	reducers: {
		ADD_CONTACT: (state, action) => {
			state.push(action.payload);
		},
		EDIT_CONTACT: (state, action) => {
			const updateState = state.map((contact) => {
				if (contact.id === action.payload.id) {
					return action.payload;
				} else {
					return contact;
				}
			});
			state = updateState;
			return state;
		},
		DELETE_CONTACT: (state, action) => {
			const filterContacts = state.filter(
				(contact) => contact.id !== action.payload
			);
			state = filterContacts;
			return state;
		},
	},
});

export const { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } =
	contactReducer.actions;
export const selectContacts = (state) => state.contacts;
export default contactReducer.reducer;
