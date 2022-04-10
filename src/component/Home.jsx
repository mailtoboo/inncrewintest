import React, { useEffect, useState } from 'react';
import EmployeeData from './EmployeeData';

const Home = () => {
	const [users, setUsers] = useState([]);
	const [currUser, setCurrUser] = useState({
		firstName: '',
		lastName: '',
		dob: '',
		designation: '',
		profilePhoto: '',
		experience: '',
		id: '',
	});
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
			if (currID != null) {
				for (let i = 0; i < users.length; i++) {
					if (users[i].id === +currID) {
						users[i] = currUser;
						setUsers([...users]);
						break;
					}
				}
			} else {
				setUsers([
					...users,
					{
						...currUser,
					},
				]);
			}
			clearField();
			setEdit(false);
			setCurrID(null);
			setSubmit(false);
		}
	}, [currID, currUser, submit, users]);

	const clearField = () => {
		setCurrUser({
			firstName: '',
			lastName: '',
			dob: '',
			designation: '',
			profilePhoto: '',
			experience: '',
			id: '',
		});
	};

	const handleChange = (e) => {
		e.preventDefault();
		setCurrUser({
			...currUser,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
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
			const filteredUser = users.filter((user) => user.id !== id);
			setUsers(filteredUser);
		}
	};

	const handleEdit = (id, editUser) => {
		setTimeout(() => {
			setCurrUser(editUser);
			setEdit(true);
			setCurrID(id);
		});
	};

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
				{isEdit ? (
					<button
						onClick={(e) => {
							e.preventDefault();
							clearField();
						}}
						style={{ marginLeft: '25px' }}
					>
						Cancel
					</button>
				) : null}
			</form>
			<EmployeeData
				handleEdit={handleEdit}
				removeUser={removeUser}
				users={users}
			/>
		</>
	);
};

export default Home;
