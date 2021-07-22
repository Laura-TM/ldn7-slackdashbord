import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import SingleUser from "./pages/SingleUser";
import Channels from "./pages/Channels";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
		<Route path="/user/:userId">
			<SingleUser />
		</Route>
		<Route path="/channels">
			<Channels />
		</Route>
	</Switch>
);

export default App;
