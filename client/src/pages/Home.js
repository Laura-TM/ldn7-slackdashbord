import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "./cyf_brand.png";
export function Home() {
	const [message, setMessage] = useState("Loading...");
	const [statistics, setStatistics] = useState([]);
	useEffect(() => {
		fetch("/api/user/U027Q7RKX5Z?time=week")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.userName);
				setStatistics(Object.values(body.statistics[0]));
				console.log(body);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	console.log(statistics);

	return (
		<main role="main">
			<div>
				<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<div className="card">
					<h1 className="message" data-qa="message">
						{message}
					</h1>
					<h2>Messages: {statistics[0]}</h2>
					<h2>Reactions: {statistics[1]}</h2>
				</div>
				<Link to="/about/this/site">About</Link>
			</div>
		</main>
	);
}
export default Home;
