import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectContacts } from "../redux/reducers/contactReducer";
import { DELETE_CONTACT } from "../redux/reducers/contactReducer";
import { toast } from "react-toastify";
const Home = () => {
	const dispatch = useDispatch();
	let contacts = useSelector(selectContacts);

	const handleDelete = (id) => {
		dispatch(DELETE_CONTACT(id));
		toast.success("Contact succesfully Deleted");
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12  my-5 text-right">
					<Link to="/add" className="btn btn-outline-dark">
						Add Contact
					</Link>
				</div>
				{contacts.length > 0 && (
					<div className="col-md-10 mx-auto">
						<table className="table table-hover">
							<thead className="text-white bg-dark text-center">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Number</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{contacts.map((contact, index) => {
									const { id, name, email, number } = contact;
									return (
										<tr key={index}>
											<td>{id}</td>
											<td>{name}</td>
											<td>{email}</td>
											<td>{number}</td>
											<td>
												<Link
													to={`/edit/${id}`}
													className="btn btn-small btn-primary mx-2"
												>
													Edit
												</Link>
												<button
													type="button"
													className="btn btn-small btn-danger mx-2"
													onClick={() => handleDelete(id)}
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;