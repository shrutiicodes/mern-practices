import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const Contact = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		company: "",
		phone: "",
	});

	const { firstName, lastName, email, company, phone } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const newContact = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			company: company,
			phone: phone,
		};
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const body = JSON.stringify(newContact);
			await axios.post("/contact", body, config);
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				company: "",
				phone: "",
			});
			window.location.reload();
		} catch (err) {
			console.error("error", err.response.data);
		}
	};

	const [contacts, setContacts] = useState([]);

	const getAllContacts = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.get("/contact", config);
			setContacts(res.data);
		} catch (err) {
			console.error("error", err);
		}
	};

	useEffect(() => {
		getAllContacts();
	}, []);

	const [currentContact, setCurrentContact] = useState({});
	const [id, setId] = useState("");

	const getContactById = async (id) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.get(`/contact/${id}`, config);
			setCurrentContact(res.data);
		} catch (err) {
			console.error("error", err);
		}
	};

	useEffect(() => {
		getContactById(id);
	}, [id]);

	const [open, setOpen] = useState(false);

	function handleClose() {
		setOpen(false);
	}

	function handleClickOpen() {
		setOpen(true);
	}

	const handleInputChange = (event) => {
		setCurrentContact({
			...currentContact,
			[event.target.name]: event.target.value,
		});
	};

	const handleEdit = async (id) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			await axios.put(
				`http://localhost:5000/contact/${id}`,
				currentContact,
				config
			);
			setCurrentContact({
				firstName: currentContact.firstName,
				lastName: currentContact.lastName,
				email: currentContact.email,
				company: currentContact.company,
				phone: currentContact.phone,
			});
			setOpen(false);
			window.location.reload();
		} catch (err) {
			console.error("error", err);
		}
	};

	const handleDelete = async (id) => {
		await axios.delete(`/contact/${id}`).then((res) => {
			const del = contacts.filter((contact) => id !== contact.id);
			setContacts(del);
			setOpen(false);
			window.location.reload();
		});
	};

	return (
		<>
			<form className="contact-form" onSubmit={(e) => onSubmit(e)}>
				<input
					type="text"
					name="firstName"
					value={firstName}
					placeholder="Enter your first name"
					onChange={(e) => onChange(e)}
					required
				></input>
				<br />
				<input
					type="text"
					name="lastName"
					value={lastName}
					placeholder="Enter your last name"
					onChange={(e) => onChange(e)}
					required
				></input>
				<br />
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Enter your email"
					onChange={(e) => onChange(e)}
					required
				></input>
				<br />
				<input
					type="text"
					name="company"
					value={company}
					placeholder="Enter your company name"
					onChange={(e) => onChange(e)}
					required
				></input>
				<br />
				<input
					type="tel"
					name="phone"
					value={phone}
					placeholder="Enter your phone no."
					onChange={(e) => onChange(e)}
					required
				></input>
				<button type="submit">Add new Contact</button>
			</form>
			<div className="contacts-container">
				<h1 style={{ textAlign: "center" }}>Contact List</h1>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogContent>
						<DialogContentText
							component={"div"}
							style={{ textAlign: "center" }}
						>
							<form className="contact-form">
								<input
									type="text"
									name="firstName"
									value={currentContact.firstName}
									placeholder="Enter your first name"
									onChange={handleInputChange}
									required
								></input>
								<br />
								<input
									type="text"
									name="lastName"
									value={currentContact.lastName}
									placeholder="Enter your last name"
									onChange={handleInputChange}
									required
								></input>
								<br />
								<input
									type="email"
									name="email"
									value={currentContact.email}
									placeholder="Enter your email"
									onChange={handleInputChange}
									required
								></input>
								<br />
								<input
									type="text"
									name="company"
									value={currentContact.company}
									placeholder="Enter your company name"
									onChange={handleInputChange}
									required
								></input>
								<br />
								<input
									type="tel"
									name="phone"
									value={currentContact.phone}
									placeholder="Enter your phone no."
									onChange={handleInputChange}
									required
								></input>
								<Button className="btn" onClick={() => handleEdit(id)}>
									<Typography className="text-primary">Save</Typography>
								</Button>
								<Button className="btn" onClick={() => handleDelete(id)}>
									<Typography className="text-primary">Delete</Typography>
								</Button>
								<Button className="btn" onClick={() => handleClose()}>
									<Typography className="text-primary">Cancel</Typography>
								</Button>
							</form>
						</DialogContentText>
					</DialogContent>
				</Dialog>
				<ul className="contact-list">
					{contacts.length > 0 ? (
						contacts.map((contact) => (
							<li key={contact._id} onClick={() => handleClickOpen()}>
								<div className="left" onClick={() => setId(contact._id)}>
									<p>
										{contact.firstName}
										&nbsp;{contact.lastName}
									</p>
									<p>{contact.email}</p>
									<p>Works at {contact.company}</p>
									<p>{contact.phone}</p>
								</div>
							</li>
						))
					) : (
						<h1 style={{ textAlign: "center", width: "90%", margin: "auto" }}>
							No Contacts Found
						</h1>
					)}
				</ul>
			</div>
		</>
	);
};

export default Contact;
