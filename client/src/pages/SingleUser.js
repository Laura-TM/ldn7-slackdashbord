import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserTable from "./UserTable";
import Headers from "./Headers";
import "./Home.css";
// todo: delete when using api
import users from "../fakeData/users.json";


export function SingleUser() {
	const [username, setUsername] = useState("Loading...");
	const [statistics, setStatistics] = useState([]);
	// get userId from url. e.g. /user/abc123
	const { userId } = useParams();
	useEffect(() => {
		const singleUser = users[userId];
		console.log(userId);
        setUsername(singleUser.username);
        setStatistics(singleUser.statistics);
		// fetch("/api/user/U027Q7RKX5Z?time=week")
		// 	.then((res) => {
		// 		if (!res.ok) {
		// 			throw new Error(res.statusText);
		// 		}
		// 		return res.json();
		// 	})
		// 	.then((body) => {
		// 		setMessage(body.userName);
		// 		setStatistics(Object.values(body.statistics[0]));
		// 		console.log(body);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
	}, []);

	console.log(statistics);

	return (
		<main role="main">
			<div className="container">
				<Headers />
				<div className="card">
					<h1 className="message" data-qa="message">
						{username}
					</h1>
				</div>
				<UserTable
                    userInfo={{ week: statistics[0], posts: statistics[1], reactions: statistics[2] }}
                />
			</div>
		</main>
	);
}
export default SingleUser;
