import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function Contact() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		company: "",
		phone: "",
	});

	const { firstName, lastName, email, company, phone } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		// console.log("Form data", e);
		e.preventDefault();

		const newUser = {
			firstName: firstName,
			lastName: lastName,
			email: email.toLowerCase(),
			company: company,
			phone: phone,
		};

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const body = JSON.stringify(newUser);
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
			const res = await axios.get("http://localhost:5000/contact", config);
			setContacts(res.data);
		} catch (err) {
			console.error("error", err);
		}
	};
	const [currentContact, setCurrentContact] = useState({});
	const [id, setId] = useState("");

	const getContactById = async (id) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.get(
				`http://localhost:5000/contact/${id}`,
				config
			);
			setCurrentContact(res.data);
		} catch (err) {
			console.error("error", err);
		}
	};

	useEffect(() => {
		getAllContacts();
	}, []);

	useEffect(() => {
		getContactById(id);
	}, [id]);

	const handleInputChange = (event) => {
		// const { name, value } = event.target;
		setCurrentContact({
			...currentContact,
			[event.target.name]: event.target.value,
		});
	};

	const [open, setOpen] = useState(false);

	function handleClose() {
		setOpen(false);
	}

	function handleClickOpen() {
		setOpen(true);
	}

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
					id="firstName"
					name="firstName"
					value={firstName}
					placeholder="Enter your First Name"
					onChange={(e) => onChange(e)}
					required
				/>
				<br />
				<input
					type="text"
					id="lastName"
					name="lastName"
					value={lastName}
					placeholder="Enter your Last Name"
					onChange={(e) => onChange(e)}
					required
				/>
				<br />
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					placeholder="Enter your Email"
					onChange={(e) => onChange(e)}
					required
				/>
				<br />
				<input
					type="text"
					id="company"
					name="company"
					value={company}
					placeholder="Enter your company Name"
					onChange={(e) => onChange(e)}
				/>
				<br />
				<input
					type="tel"
					id="phone"
					name="phone"
					value={phone}
					placeholder="Enter your Phone Number"
					onChange={(e) => onChange(e)}
					required
				/>
				<br />
				<button type="submit">Add New Contact</button>
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
									id="firstName"
									name="firstName"
									value={currentContact.firstName}
									placeholder="Enter your First Name"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={currentContact.lastName}
									placeholder="Enter your Last Name"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									type="email"
									id="email"
									name="email"
									value={currentContact.email}
									placeholder="Enter your Email"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									type="text"
									id="company"
									name="company"
									value={currentContact.company}
									placeholder="Enter your company Name"
									onChange={handleInputChange}
								/>
								<br />
								<input
									type="tel"
									id="phone"
									name="phone"
									value={currentContact.phone}
									placeholder="Enter your Phone Number"
									onChange={handleInputChange}
									required
								/>
								<br />
								<Button
									className="btn"
									variant="outlined"
									onClick={() => handleEdit(id)}
								>
									<Typography className="text-primary">Save</Typography>
								</Button>
								<Button
									className="btn"
									variant="outlined"
									onClick={() => handleDelete(id)}
								>
									<Typography className="text-primary">Delete</Typography>
								</Button>
								<Button
									className="btn"
									variant="outlined"
									onClick={handleClose}
								>
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
										&nbsp;
										{contact.lastName}
									</p>
									<p>{contact.email}</p>
									<p>Works at {contact.company}</p>
									<p>{contact.phone}</p>
								</div>
							</li>
						))
					) : (
						<h1 style={{ textAlign: "center", width: "90%", margin: "auto" }}>
							No contacts found
						</h1>
					)}
				</ul>
			</div>
		</>
	);
}

export default Contact;
