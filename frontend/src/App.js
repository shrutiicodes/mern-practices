import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [profiles, setProfiles] = useState([]);

	const getProfilesHere = () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: "Access-Control-Allow-Origin",
			},
		};
		try {
			axios.get("http://localhost:5000/profiles", config).then((res) => {
				var profiles = res.data;
				// console.log(profiles);
				setProfiles(profiles);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getProfilesHere();
	});

	return (
		<>
			<div className="App">
				<ul>
					{profiles.length > 0 ? (
						profiles.map((profile) => (
							<li key={profile.id}>
								<p>Myself {profile.name}</p>
								<p>Contact me - {profile.email}</p>
								<p>I am {profile.age} years old</p>
								<p>I was born in {profile.YOB}</p>
							</li>
						))
					) : (
						<h4>No profiles found...</h4>
					)}
				</ul>
			</div>
		</>
	);
}

export default App;
