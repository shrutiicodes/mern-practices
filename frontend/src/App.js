import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FetchData from "./Components/FetchData";
import Contact from "./Components/Contact";
import NotFound from "./Components/NotFound";
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Dashboard from "./Components/Dashboard";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<>
			<div className="App">
				<Router>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/data">
							<FetchData />
						</Route>
						<Route exact path="/contact">
							<Contact />
						</Route>
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/dashbord" component={Dashboard} />
						<Route exact path="" component={NotFound} />
					</Switch>
				</Router>
			</div>
		</>
	);
};

export default App;
