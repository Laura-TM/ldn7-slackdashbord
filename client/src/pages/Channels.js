import { useState, useEffect } from "react";
import SortableTable from "../components/SortableTable";

const Channels = () => {
	const [channelList, setChannelList] = useState([]);

	useEffect(() => {
		fetch("/api/channelList")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setChannelList(body.channels);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main className="allChannelsTableContainer">
			<SortableTable channelList={channelList} />
		</main>
	);
};

export default Channels;
