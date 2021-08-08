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
				setMessage(body[1].total_message);
				setReaction(body[1].total_reaction);
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
						<div>Number of posts: {message}</div>
						<div>Number of reactions: {reaction}</div>
					</div>
				</div>
			</div>
		</main>
	);
};
export default SingleUser;
