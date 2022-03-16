import React, { useState } from "react";
import { selectContacts } from "../redux/reducers/contactReducer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ADD_CONTACT } from "../redux/reducers/contactReducer";
import { useHistory } from "react-router-dom";

const AddContact = () => {
	const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const contacts = useSelector(selectContacts);
	const dispatch = useDispatch();
	const history = useHistory();
	// ====== EVENTS ====
	const handleSubmit = (e) => {
		e.preventDefault();

		// const checkEmail = contacts.find(
		// 	(contact) => contact.email === email && email
		// );

		const checkNumber = contacts.find(
			(contact) => contact.number.toString() === number && number
		);

		if (!name || !number) {
			return toast.warning("Please fill in all fields!");
		}

		// if (checkEmail) {
		// 	return toast.error("This email already Exists!");
		// }

		if (checkNumber) {
			return toast.error("This number already Exists!");
		}
		const data = {
			id: contacts.length + 1,
			name,
			number,
		};
		dispatch(ADD_CONTACT(data));
		toast.success("Student Added Succesfully");
		history.push("/");
	};

	return (
		<div className="container" id="contact-container">
			<h1 className="display-3 my-5 text-center">Add Student</h1>
			<div className="row">
				<div className="col-md-5 shadow p-5 mx-auto">
					{/* ======== FORM ======= */}
					<form onSubmit={handleSubmit}>
						<div class="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						{/* <div class="mb-3">
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div> */}
						<div className="mb-3">
							<input
								type="number"
								className="form-control"
								placeholder="Phone Number"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
							/>
						</div>
						<div className="d-grid gap-2">
							<button className="btn btn-dark" type="submit">
								Add Student
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddContact;
