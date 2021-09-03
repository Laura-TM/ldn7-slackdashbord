import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";

const Channels = () => {
	const { cohortId, cohortName } = useParams();
	const [channelList, setChannelList] = useState([]);
	console.log(cohortId);
	useEffect(() => {
		fetch(`/api/channels/${cohortId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				console.log(body);
				// const sortedChannels = body.channels.sort(
				// 	(firstEl, secondEl) => secondEl.num_members - firstEl.num_members
				// );
				setChannelList(body);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main>
			<Table borderless hover className="table" responsive>
				<thead className="text-center">
					<TableHead />
				</thead>
				<tbody className="text-center">
					{channelList.map((channel, index) => (
						<TableRow channel={channel} key={index} />
					))}
				</tbody>
			</Table>
		</main>
	);
};

export default Channels;
