import React, { useState } from "react";
import arrow from "../images/arrow.png";
import "../pages/Home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";

const TableRow = ({ channel }) => {
	const [selectedRow, setSelectedRow] = useState(false);
	const user = useSelector(selectUser);
	const role = user.userId;
	const path =
		role == "mentor"
			? `/channel/${channel.name}/${channel.id}`
			: `/user/${channel.id}/${role}/${user.name}`;
	function rowSelected() {
		setSelectedRow(!selectedRow);
	}

	return (
		<tr className={selectedRow ? "selectedRow" : " "} onClick={rowSelected}>
			<th scope="row">
				<Link
					style={{
						textDecoration: "none",
						textTransform: "capitalize",
						color: "black",
						fontWeight: "lighter",
					}}
					// TO BE USED with real data
					// to={`/channel/${channel.channel_name}/${channel.channel_id}`}
					to={path}
				>
					{/* TO BE USED with real data */}
					{/* {channel.channel_name} */}
					{channel.name}
				</Link>
			</th>
			<td>
				<Link
					style={{
						textDecoration: "none",
						color: "black",
						fontWeight: "lighter",
					}}
					// TO BE USED with real data
					// to={`/channel/${channel.channel_name}/${channel.channel_id}`}
					to={path}
				>
					{channel.num_members}
				</Link>
			</td>
			<td className="arrowSelector">
				<Link
					style={{
						textDecoration: "none",
						color: "black",
						fontWeight: "lighter",
					}}
					// TO BE USED with real data
					// to={`/channel/${channel.channel_name}/${channel.channel_id}`}
					to={path}
				>
					{<img className="arrow" src={arrow} alt="arrow" />}
				</Link>
			</td>
		</tr>
	);
};

export default TableRow;
