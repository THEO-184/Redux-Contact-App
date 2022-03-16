import { render, screen, fireEvent } from "../test_utils";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";
import { waitFor } from "@testing-library/react";

describe("App", () => {
	test("should render form when add contact is clicked", async () => {
		render(<App />);
		const addContactEl = screen.getByText(/Add Contact/i);
		expect(addContactEl).toBeInTheDocument();
		fireEvent.click(addContactEl);
		const container = document.querySelector("#contact-container");
		const buttonElement = within(container).getByRole("button", {
			name: "Add Student",
		});
		expect(buttonElement).toBeInTheDocument();
	});

	test("input elements should be displaying typed inputs", async () => {
		render(<App />);
		const addContactEl = screen.queryByText(/Add Contact/i);
		expect(addContactEl).not.toBeInTheDocument();

		const container = document.querySelector("#contact-container");
		const nameInputEl = within(container).getByPlaceholderText(/name/i);
		userEvent.type(nameInputEl, "Theophilus Boakye");
		expect(nameInputEl).toHaveDisplayValue("Theophilus Boakye");

		const phoneInputEl =
			within(container).getByPlaceholderText(/phone number/i);
		userEvent.type(phoneInputEl, "0559650621");
		expect(phoneInputEl).toHaveDisplayValue("0559650621");
		const buttonElement = within(container).queryByRole("button", {
			name: "Add Student",
		});
		userEvent.click(buttonElement);
		expect(buttonElement).not.toBeInTheDocument();
		const tableEl = screen.getByRole("table");
		expect(tableEl).toBeInTheDocument();
	});

	test("typed inputs should be displayed in a table form", async () => {
		render(<App />);
		const tableEl = document.getElementsByTagName("table")[0];
		const displayNameEl = within(tableEl).getByText("Theophilus Boakye");
		expect(displayNameEl).toBeInTheDocument();
		const displayNumberEl = within(tableEl).getByText(/0559650621/i);
		expect(displayNumberEl).toBeInTheDocument();
	});

	// test("delete btn should delete item from the table", async () => {
	// 	render(<App />);
	// 	const tableEl = document.getElementsByTagName("table")[0];
	// 	const displayNameEl = within(tableEl).queryByText("Theophilus Boakye");
	// 	const deleteBtnEl = within(tableEl).queryByRole("button", {
	// 		name: "Delete",
	// 	});
	// 	expect(deleteBtnEl).toBeInTheDocument();
	// 	expect(displayNameEl).toBeInTheDocument();
	// 	userEvent.click(deleteBtnEl);
	// 	expect(deleteBtnEl).not.toBeInTheDocument();
	// 	expect(displayNameEl).not.toBeInTheDocument();
	// });

	test("edit btn should take user to edit page with inputs already filled with user info", async () => {
		render(<App />);
		const tableEl = document.getElementsByTagName("table")[0];
		const editBtnEl = within(tableEl).getByRole("link", { name: "Edit" });
		userEvent.click(editBtnEl);
		const editContainer = document.getElementById("edit-container");
		const nameInputEl = await within(editContainer).findByDisplayValue(
			"Theophilus Boakye"
		);
		const phoneInputEl = await within(editContainer).findByDisplayValue(
			"0559650621"
		);
		expect(editBtnEl).not.toBeInTheDocument();
		expect(nameInputEl).toBeInTheDocument();
		expect(phoneInputEl).toBeInTheDocument();
	});
	test("when user change contact info and update it, that details must be displayed in the table element", async () => {
		render(<App />);
		const editContainer = document.getElementById("edit-container");
		const nameInputEl = await within(editContainer).findByDisplayValue(
			"Theophilus Boakye"
		);
		const phoneInputEl = await within(editContainer).findByDisplayValue(
			"0559650621"
		);
		userEvent.type(nameInputEl, "Tracy Boakye Yiadom");
		userEvent.type(phoneInputEl, "00103910910190");
		const updateStudentEl = within(editContainer).getByText(/update student/i);
		userEvent.click(updateStudentEl);
		const tableEl = document.getElementsByTagName("table")[0];
		const contactInfoEl = within(tableEl).getByText(/Tracy Boakye Yiadom/i);
		expect(contactInfoEl).toBeInTheDocument();
	});
});
