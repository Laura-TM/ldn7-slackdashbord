import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "./Home.css";
// todo: delete when using api
import notFound from "./unknown_profile.png";

const SingleUser = () => {
	const [message, setMessage] = useState("?");
	const [reaction, setReaction] = useState("?");
	const { userId, channelId, userName } = useParams();
	useEffect(() => {
		fetch(`/api/userSum/${channelId}/${userId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body[0].total_message);
				setReaction(body[0].total_reaction);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [channelId, userId]);

	return (
		<main role="main">
			<div className="container">
				<NavBar />
				<div className="username">{userName}</div>
				<div className="userDetails">
					<img
						className="profilePic"
						data-qa="logo"
						src={notFound}
						alt="profile pic"
					/>
					<div className="userStats">
						<div>Data for last week</div>
						{Object.values(stats).map((message, index) => (
							<div key={index}>
								<div>Number of posts: {message.messageCount}</div>
								<div>Number of reactions: {message.reactionCount}</div>
							</div>
						))}
						<div>Profile: {profile}</div>
					</div>
				</div>
			</div>
		</main>
	);
};
export default SingleUser;
