import React, { useState, useEffect } from "react";
import axios from "axios";

function FetchData() {
	const [profiles, setProfiles] = useState([]);

	const getProfiles = () => {
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
		getProfiles();
	}, []);

	return (
		<>
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
					<h1>No profiles found</h1>
				)}
			</ul>
		</>
	);
}
export default FetchData;
