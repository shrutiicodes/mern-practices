import React, { useEffect } from "react";
import "./App.css";
import FetchData from "./Components/FetchData";
import Contact from "./Components/Contact";

const App = () => {
	return (
		<>
			<div className="App">
				<FetchData />
				<Contact />
			</div>
		</>
	);
};

export default App;
