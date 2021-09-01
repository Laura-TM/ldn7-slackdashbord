import "../pages/Home.css";
import { BsPersonBoundingBox } from "react-icons/bs";

const HomeUserButtons = ({ setToken }) => {
	function onClick() {
		setToken("Home");
	}
	return (
		<div className="buttonsContainer">
			<button className="userButton" onClick={onClick}>
				<BsPersonBoundingBox className="userIconBs" />
				Admin
			</button>
			<button className="userButton" onClick={onClick}>
				<BsPersonBoundingBox className="userIconBs" />
				Mentor
			</button>
			<button className="userButton" onClick={onClick}>
				<BsPersonBoundingBox className="userIconBs" />
				Trainee
			</button>
		</div>
	);
};

export default HomeUserButtons;
