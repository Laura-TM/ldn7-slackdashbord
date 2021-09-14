import { Line, defaults } from "react-chartjs-2";

defaults.font.family = "Varela Round";

const SingleUserChart = (props) => {
	const state = {
		data: {
			labels: props.label,
			datasets: [
				{
					label: "User's messages",
					// backgroundColor: "#009900",
					// borderColor: "#1e4d2b",
					backgroundColor: "#3C0F3D",
					borderColor: "#3C0F3D",
					borderWidth: 2,
					data: props.messagesDataSet,
				},

				{
					label: "User's reactions",
					// backgroundColor: "#ff8c00",
					// borderColor: "#e86100",
					backgroundColor: "#E31C5C",
					borderColor: "#E31C5C",
					borderWidth: 2,
					data: props.reactionsDataSet,
				},

				{
					label: "Channel average messages",
					// backgroundColor: "#bdda57",
					// borderColor: "#1e4d2b",
					backgroundColor: "#FCAC04",
					borderColor: "#FCAC04",
					borderWidth: 4,
					borderDash: [6, 8],
					data: props.averageMessages,
				},

				{
					label: "Channel average reactions",
					// backgroundColor: "#ffa812",
					// borderColor: "#e86100",
					// borderWidth: 3,
					// borderDash: [6, 8],
					backgroundColor: "#045C9C",
					borderColor: "#045C9C",
					borderWidth: 4,
					borderDash: [2, 8],
					data: props.averageReactions,
				},
			],
		},
	};
	const options = {
		maintainAspectRatio: true,
		aspectRatio: 2,
		legend: {
			display: false,
		},
	};
	return (
		<div className="singleUserChart">
			<Line data={state.data} options={options} />
		</div>
	);
};

export default SingleUserChart;
