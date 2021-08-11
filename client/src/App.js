import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SingleUser from "./pages/SingleUser";
import Channels from "./pages/Channels";
import Channel from "../src/pages/Channel";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const App = () => {
	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/user/:channelId/:userId">
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
