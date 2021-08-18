import { Line } from "react-chartjs-2";

const SingleUserChart = (props) => {
	const state = {
		data: {
			labels: props.label,
			datasets: [
				{
					label: "Messages",
					backgroundColor: "#009900",
					borderColor: "#1e4d2b",
					borderWidth: 2,
					data: props.messagesDataSet,
				},

				{
					label: "Reactions",
					backgroundColor: "#ff8c00",
					borderColor: "#e86100",
					borderWidth: 2,
					data: props.reactionsDataSet,
				},
				{
					label: "Average messages",
					backgroundColor: "#bdda57",
					borderColor: "#1e4d2b",
					borderWidth: 3,
					borderDash: [6, 8],
					borderDashOffset: [1, 2, 3],
					data: props.averageMessages,
				},

				{
					label: "Average reactions",
					backgroundColor: "#ffa812",
					borderColor: "#e86100",
					borderWidth: 3,
					borderDash: [6, 8],
					borderDashOffset: [1, 2, 3],
					data: props.averageReactions,
				},
			],
		},
	};
	const options = {
		responsive: true,
		legend: {
			display: false,
		},
	};
	return (
		<div className="chart">
			<Line data={state.data} options={options} />
		</div>
	);
};

export default SingleUserChart;
