import { Button } from "reactstrap";

const ChannelButton = ({ setToken }) => {
	return (
		<div>
			<Button
				className="getStartedButton"
				onClick={() => {
					setToken("Home");
					// throwing errors in console:
					// history.push("/channels");
				}}
			>
				Get started
			</Button>{" "}
		</div>
	);
};

export default ChannelButton;
