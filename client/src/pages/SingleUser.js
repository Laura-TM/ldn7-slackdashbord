import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "./Headers";
import "./Home.css";
// todo: delete when using api
import notFound from "./unknown_profile.png";

const SingleUser = () => {
	const [username, setUsername] = useState("Loading...");
	const [stats, setStats] = useState("?");
	const [profile, setProfile] = useState("Happy Coder");
	const { userId, channelId } = useParams();
	console.log(userId);
	useEffect(() => {
		fetch(`/api/user/${channelId}/${userId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setUsername(body.userName);
				setStats(body.statistics);
				setProfile(body.profile.title)
			})
			.catch((err) => {
				setUsername(`USER ${userId} NOT FOUND`);
				setProfile("Not found");
				console.error(err);
			});
	}, [userId]);

	console.log(profile)

	return (
		<main role="main">
			<div className="container">
				<Headers size="small" />
				<div className="username">{username}</div>
				<div className="userDetails">
					<img
						className="profilePic"
						data-qa="logo"
						src={notFound}
						alt="profile pic"
					/>
					<div className="userStats">
						<div>Last Week:</div>
						{Object.values(stats).map((message, index) => (
							<div key={index}>
								<div>Number of posts: {message.messageCount}</div>
								<div>Number of reactions: {message.reactionCount}</div>
							</div>
						))}
						<div>
							Profile: {profile}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
export default SingleUser;
