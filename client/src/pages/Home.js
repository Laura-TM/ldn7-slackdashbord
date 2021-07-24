import Headers from "./Headers";
import UserDropdown from "./Dropdown";
import ChannelButton from "./Button";
import Footer from "./Footer";
import "./Home.css";
// todo replace:
// import users from "../fakeData/users.json";

const Home = () => {
	return (
		<main role="main">
			<div className="container">
				<Headers size="large" />
				<h3>On this site, you can access all sorts of stats about the Code Your Future slack channels and users.</h3>
				<ChannelButton />
				{/* <UserDropdown users={users} /> */}
			</div>
			<Footer />
		</main>
	);
};
export default Home;
