import HomeUserButtons from "../components/HomeUserButtons";
import "./Home.css";
import PropTypes from "prop-types";

const Home = ({ setToken }) => {
	Home.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	return (
		<div className="homePageContainer">
			<div className="introMessage">
				<h1>Hi there, welcome to CYF Slacktastic dashboard!</h1>
				<h2>
					This site allows you to access all sorts of stats about the Code Your
					Future slack channels and users.
				</h2>
			</div>
			<div className="buttonsContainer">
				<HomeUserButtons content="ADMIN" setToken={setToken} />
				<HomeUserButtons content="MENTOR" setToken={setToken} />
				<HomeUserButtons content="TRAINEE" setToken={setToken} />
			</div>
		</div>
	);
};
export default Home;
