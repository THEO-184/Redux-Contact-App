import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectContacts } from "../redux/reducers/contactReducer";
import { EDIT_CONTACT } from "../redux/reducers/contactReducer";
import { toast } from "react-toastify";
const EditContact = () => {
	const { id } = useParams();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();
	const contacts = useSelector(selectContacts);
	// console.log(contacts);
	let currentContact = contacts.find((contact) => contact.id === parseInt(id));

	useEffect(() => {
		if (currentContact) {
			setName(currentContact.name);
			setEmail(currentContact.email);
			setNumber(currentContact.number);
		}
	}, [currentContact]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const checkEmail = contacts.find(
			(contact) =>
				contact.id !== parseInt(id) && contact.email === email && email
		);

		const checkNumber = contacts.find(
			(contact) =>
				contact.id !== parseInt(id) &&
				contact.number.toString() === number &&
				number
		);

		if (!email || !name || !number) {
			return toast.warning("Please fill in all fields!");
		}

		if (checkEmail) {
			return toast.error("This email already Exists!");
		}

		if (checkNumber) {
			return toast.error("This number already Exists!");
		}
		const data = {
			id: parseInt(id),
			name,
			number,
			email,
		};
		dispatch(EDIT_CONTACT(data));
		toast.success("Student Updated Succesfully");
		history.push("/");
	};
	return (
		<div className="container">
			{currentContact ? (
				<>
					<h1 className="display-3 my-5 text-center">Edit Student {id}</h1>
					<div className="row">
						<div className="col-md-5 shadow p-5 mx-auto">
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<input
										type="text"
										className="form-control"
										placeholder="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<input
										type="email"
										className="form-control"
										placeholder="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<input
										type="number"
										className="form-control"
										placeholder="Phone Number"
										value={number}
										onChange={(e) => setNumber(e.target.value)}
									/>
								</div>
								<div className="d-flex justify-content-center">
									<button
										className="btn mx-2 btn-dark"
										type="submit"
										onClick={handleSubmit}
									>
										Update Student
									</button>
									<Link to="/" className="btn btn-danger mx-2">
										Cancel
									</Link>
								</div>
							</form>
						</div>
					</div>
				</>
			) : (
				<h1 className="display-3 my-5 text-center">
					Student contact with id {id} does not exists
				</h1>
			)}
		</div>
	);
};

export default EditContact;
