import React from 'react';
import { Modal } from '@mui/material';

const AddUser = ({ isOpen, handleClose }) => {
	// const [isOpen, setOpen] = useState(false);
	return (
		<>
			<Modal open={isOpen} onClose={handleClose}>
				<div>Add User</div>
			</Modal>
		</>
	);
};

export default AddUser;
