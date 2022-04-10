import React from 'react';

const EmployeeData = ({ users, removeUser, handleEdit }) => {
	return (
		<>
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
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={`emp-${index}`}>
							<td className='empData'>{user.firstName}</td>
							<td className='empData'>{user.lastName}</td>
							<td className='empData'>{user.dob}</td>
							<td className='empData'>{user.designation}</td>
							<td className='empData'>
								<a
									href={user.profilePhoto}
									target='_blank'
									rel='noopener noreferrer'
								>
									{user.profilePhoto}
								</a>
							</td>
							<td className='empData'>{user.experience}</td>
							<td>
								<button onClick={() => removeUser(user.id)}>
									Remove User
								</button>
							</td>
							<td>
								<button
									onClick={() => {
										handleEdit(user.id, user);
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

export default EmployeeData;
