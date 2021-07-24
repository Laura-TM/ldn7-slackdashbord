import React, { useState, useEffect } from "react";
import Headers from "./Headers";
import { Table } from "reactstrap";
import { useParams, Link } from "react-router-dom";

const Channel = () => {
	const { name, channelId } = useParams();
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		fetch(`/api/channelUser/${channelId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setUserList(body);
			})
			.catch((err) => {
				console.error(err);
			});

		// fetch(`/api/avr/${userId}`)
		// .then((res) => {
		// 	if (!res.ok) {
		// 		throw new Error(res.statusText);
		// 	}
		// 	return res.json();
		// })
		// .then((body) => {
		// 	setMessageCount(body.messageCount);
		// 	setReactionCount(body.reactionCount);

		// })
		// .catch((err) => {
		// 	console.error(err);
		// });
	}, []);

	return (
		<main role="main">
			<div className="container">
				<Headers size="small" />
				<div>
					<h1 className="text-center">
						{name.replace(/^./, name[0].toUpperCase())} Channel Users
					</h1>
					<Table hover>
						<thead>
							<tr>
								<th>#</th>
								<th>User Name</th>
								<th>Messages</th>
								<th>Reactions</th>
							</tr>
						</thead>
						<tbody>
							{userList.map((user, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>
										<Link to={`/user/${channelId}/${user.id}`}>
										{user.real_name}</Link>
									</td>
									<td></td>
									<td></td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</main>
	);
};

export default Channel;
