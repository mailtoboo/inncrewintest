import React, { useEffect, useState } from 'react';

const Home = () => {
	const [users, setUsers] = useState([]);
	const [currUser, setCurrUser] = useState({});
	const [isEdit, setEdit] = useState(false);
	const [currID, setCurrID] = useState(null);
	const [submit, setSubmit] = useState(false);
	const fieldElements = [
		'firstName',
		'lastName',
		'dob',
		'designation',
		'profilePhoto',
		'experience',
	];

	useEffect(() => {
		if (submit) {
			console.log(users);
			console.log('currUser.id', currUser.id);
			console.log('currID', currID);
			setUsers([
				...users,
				{ [currID !== null ? currID : currUser.id]: currUser },
			]);
			setCurrUser({
				firstName: '',
				lastName: '',
				dob: '',
				designation: '',
				profilePhoto: '',
				experience: '',
				id: '',
			});
			setEdit(false);
			setCurrID(null);
			setSubmit(false);
		}
	}, [currUser, submit, users]);

	const handleChange = (e) => {
		e.preventDefault();
		setCurrUser({
			...currUser,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		console.log('currUser');
		console.log(currUser);
		e.preventDefault();
		setCurrUser({
			...currUser,
			id: currID !== null ? currID : users.length,
		});
		setSubmit(true);
	};

	const removeUser = (id) => {
		const confirm = window.confirm();
		if (confirm) {
			const filteredUser = users.filter(
				(user, index) => user[index].id != id
			);
			console.log(filteredUser);
			setUsers(filteredUser);
		}
	};

	const handleEdit = (id, editUser) => {
		// removeUser(id);
		setTimeout(() => {
			setCurrUser(editUser);
			setEdit(true);
			setCurrID(id);
		});
	};

	console.log('USERS');
	console.log(users);
	return (
		<>
			<h2 className='text-center'>Home</h2>
			{!isEdit ? <h3>Add User</h3> : <h3>Edit user</h3>}
			<form>
				{fieldElements.map((field) => (
					<div key={`emp-${field}`} className='field'>
						<label id={field}>{field}</label>
						<input
							htmlFor={field}
							type='input'
							name={field}
							onChange={(e) => handleChange(e)}
							value={currUser[field]}
						/>
					</div>
				))}
				<button onClick={handleSubmit}>
					{!isEdit ? 'Add User' : 'Update User'}
				</button>
			</form>
			<h3>Employee List</h3>
			<table className='tableBorder'>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>DOB</th>
						<th>Designation</th>
						<th>Profile Photo</th>
						<th>Experience</th>
						<th>Remove User</th>
						<th>Edit User</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={`emp-${index}`}>
							<td>{user[index] && user[index].firstName}</td>
							<td>{user[index] && user[index].lastName}</td>
							<td>{user[index] && user[index].dob}</td>
							<td>{user[index] && user[index].designation}</td>
							<td>
								<a
									href={
										user[index] && user[index].profilePhoto
									}
									target='_blank'
									rel='noopener noreferrer'
								>
									{user[index] && user[index].profilePhoto}
								</a>
							</td>
							<td>{user[index] && user[index].experience}</td>
							<td>
								<button
									onClick={() => removeUser(user[index].id)}
								>
									x
								</button>
							</td>
							<td>
								<button
									onClick={() => {
										handleEdit(user[index].id, user[index]);
									}}
								>
									Edit User
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Home;
