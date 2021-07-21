import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "./Headers";
import "./Home.css";
// todo: delete when using api
import notFound from "./unknown_profile.png";

const SingleUser = () => {
	const [username, setUsername] = useState("Loading...");
	const [messageCount, setMessageCount] = useState("?");
	const [reactionCount, setReactionCount] = useState("?");
	const [profile, setProfile] = useState("Happy Coder");
	// get userId from url. e.g. /user/abc123
	const { userId } = useParams();
	useEffect(() => {
		fetch(`/api/user/${userId}?time=week`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setUsername(body.userName);
			})
			.catch((err) => {
				setUsername(`USER ${userId} NOT FOUND`);
				setProfile("Not found");
				console.error(err);
			});

			fetch(`/api/avr/${userId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessageCount(body.messageCount);
				setReactionCount(body.reactionCount);

			})
			.catch((err) => {
				console.error(err);
			});
	}, [userId]);

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
						<div>
							Week: 1
						</div>
						<div>
							Number of posts: {messageCount}
						</div>
						<div>
							Number of reactions: {reactionCount}
						</div>
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