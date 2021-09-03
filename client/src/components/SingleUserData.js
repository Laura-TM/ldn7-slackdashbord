import React from "react";
import { useEffect, useState } from "react";
import "../pages/Home.css";

const SingleUserData = ({
	channelId,
	userId,
	averageMessages,
	averageReactions,
}) => {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		fetch(`/api/userSum/${channelId}/${userId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				console.log(body.splice(0, 4));
				setUserData(body.splice(0, 4));
			})
			.catch((err) => {
				console.error(err);
			});
	}, [channelId, userId]);
	console.log(userData);
	return (
		<div>
			{userData && userData.length > 0 ? (
				<div>
					<td
						className={
							userData[0].total_message < averageMessages[0] ? "red" : "green"
						}
					>
						{userData[0].total_message}
					</td>
					<td
						className={
							userData[0].total_reaction < averageReactions[0] ? "red" : "green"
						}
					>
						{userData[0].total_reaction}
					</td>
					<td
						className={
							userData[1].total_message < averageMessages[1] ? "red" : "green"
						}
					>
						{userData[1].total_message}
					</td>
					<td
						className={
							userData[1].total_reaction < averageReactions[1] ? "red" : "green"
						}
					>
						{userData[1].total_reaction}
					</td>
				</div>
			) : (
				<span>No data found for this user</span>
			)}
		</div>
	);
};

export default SingleUserData;
