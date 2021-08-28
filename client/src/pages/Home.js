import ChannelButton from "../components/Button";
import "./Home.css";
import PropTypes from "prop-types";

const Home = ({ setToken }) => {
	Home.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	return (
		<main>
			<div className="introMessage">
				<h1>Hi there, welcome to CYF Slacktastic dashboard!</h1>
				<h2>
					This site allows you to access all sorts of stats about the Code Your
					Future slack channels and users.
				</h2>
			</div>
			<ChannelButton setToken={setToken} />
		</main>
	);
};
export default Home;
