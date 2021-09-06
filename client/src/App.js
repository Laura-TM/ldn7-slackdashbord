import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import SingleUser from "./pages/SingleUser";
import Channels from "./pages/Channels";
import Cohorts from "./pages/Cohorts";
import Channel from "../src/pages/Channel";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";

const App = () => {
	const [token, setToken] = useState(false);
	if (!token) return <Home setToken={setToken} />;
	else if (token == "logout") return <Logout setToken={setToken} />;
	else if (token == "Home") return <Login setToken={setToken} />;
	else if (token == "signUp") return <SignUp setToken={setToken} />;
	else if (token != "login") {
		return <Login setToken={setToken} />;
	}

	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/user/:channelId/:userId/:userName">
				<SingleUser setToken={setToken} />
			</Route>
			<Route path="/channels/:userId">
				<Channels setToken={setToken} />
			</Route>
			<Route path="/cohorts">
				<Cohorts setToken={setToken} />
			</Route>
			<Route path="/channel/:name/:channelId">
				<Channel setToken={setToken} />
			</Route>
			<Route path="/login/:role">
				<Login />
			</Route>
			<Route path="/logout">
				<Logout setToken={setToken} />
			</Route>
			<Route path="/signUp/:role">
				<SignUp></SignUp>
			</Route>
		</Switch>
	);
};

export default App;
