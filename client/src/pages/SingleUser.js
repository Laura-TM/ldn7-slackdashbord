import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "./Headers";
import "./Home.css";
// todo: delete when using api
import notFound from "./unknown_profile.png";

export function SingleUser() {
	const [username, setUsername] = useState("Loading...");
	const [profile, setProfile] = useState("Happy Coder");
	const [statistics, setStatistics] = useState([]);
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
				console.log(body);
				setUsername(body.userName);
				setStatistics(Object.values(body.statistics[0]));
			})
			.catch((err) => {
				setUsername(`USER ${userId} NOT FOUND`);
				setStatistics([]);
				setProfile("Not found");
				console.error(err);
			});
	}, []);

	console.log(statistics);


	//https://icon-library.com/images/web-user-icon/web-user-icon-8.jpg
	return (
		<main role="main">
			<div className="container">
				<Headers />
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
							Number of posts: {statistics[0]}
						</div>
						<div>
							Number of reactions: {statistics[1]}
						</div>
						<div>
							Profile: {profile}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
export default SingleUser;

/*
{userName: "Askin Ekinci",
statistics: Array(1)}statistics: Array(1)0:
{messageCount: 1, reactionCount: 0}length: 1__proto__: Array(0)userName: "Askin Ekinci"__proto__: Object
SingleUser.js:38 (2) [1, 0]
*/