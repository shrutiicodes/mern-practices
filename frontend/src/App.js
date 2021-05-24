import React from "react";
import "./App.css";
import FetchData from "./Components/FetchData";
import Contact from "./Components/Contact";

function App() {
	return (
		<>
			<div className="App">
				<FetchData />
				<Router>
					<Switch>
						<Route exact path="/">
							<Contact />
						</Route>
						<Route exact path="/contact/:id">
							<Contact />
						</Route>
						{/* <Route component={NotFound} /> */}
					</Switch>
				</Router>
			</div>
		</>
	);
}

export default App;
