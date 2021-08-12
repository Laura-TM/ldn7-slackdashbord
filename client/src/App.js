import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import SingleUser from "./pages/SingleUser";
import Channels from "./pages/Channels";
import Channel from "../src/pages/Channel";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import useToken from "./pages/useToken";

// function setToken(userToken) {
// 	sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
// 	const tokenString = sessionStorage.getItem("token");
// 	const userToken = JSON.parse(tokenString);
// 	return userToken?.token;
// }

const App = () => {
	const { token, setToken } = useToken();
	//const token = getToken();
	//const [token, setToken] = useState();
	if (!token) {
		return <Login setToken={setToken} />;
	}

	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/user/:channelId/:userId/:userName">
				<SingleUser />
			</Route>
			<Route path="/channels">
				<Channels />
			</Route>
			<Route path="/channel/:name/:channelId">
				<Channel />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/logout">
				<Logout />
			</Route>
		</Switch>
	);
};

export default App;
