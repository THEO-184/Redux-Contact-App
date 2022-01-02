import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	contacts: [],
};

const contactReducer = createSlice({
	name: "contact",
	initialState,
	reducers: {
		ADD_CONTACT: (state, action) => {
			state.contacts.push(action.payload);
		},
		EDIT_CONTACT: (state, action) => {
			const updateState = state.contacts.map((contact) => {
				if (contact.id === action.payload.id) {
					return action.payload;
				} else {
					return contact;
				}
			});
			state.contacts = updateState;
			return state;
		},
		DELETE_CONTACT: (state, action) => {
			state.contacts = state.contacts.filter(
				(contact) => contact.id !== action.payload
			);
			// state.contacts = filterContacts;
			// return state;
		},
	},
});

export const { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } =
	contactReducer.actions;
export const selectContacts = (state) => state.contacts.contacts;
export default contactReducer.reducer;
