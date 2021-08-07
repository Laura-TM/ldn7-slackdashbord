import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const TableRow = ({ channel }) => {
	const [selectedRow, setSelectedRow] = useState(false);

	function rowSelected() {
		setSelectedRow(!selectedRow);
	}

	return (
		<tr className={selectedRow ? "selectedRow" : " "} onClick={rowSelected}>
			<th scope="row">
				<Link to={`/channel/${channel.name}/${channel.id}`}>
					{channel.name}
				</Link>
			</th>
			<td>{channel.num_members}</td>
		</tr>
	);
};

export default TableRow;
