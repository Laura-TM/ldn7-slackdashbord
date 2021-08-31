import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./pages/store";
import App from "./App";
import MiniDrawerNavBar from "./components/MiniDrawerNavBar";

ReactDOM.render(
	<div>
		<BrowserRouter>
			<MiniDrawerNavBar>
				<Provider store={store}>
					<App />
				</Provider>
			</MiniDrawerNavBar>
		</BrowserRouter>
	</div>,
	document.getElementById("root")
);
