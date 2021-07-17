import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchChannelList, fetchChannelHistory, fetchUserList } from "../api";
import "./Home.css";
import logo from "./logo.svg";

export function Home() {
	const [channelList, setChannelList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [channelHistory, setChannelHistory] = useState([]);

	useEffect(() => {
		const getChannelList = async () => {
			const fetchedChannelListData = await fetchChannelList();
			setChannelList(fetchedChannelListData);
		};
		getChannelList();
	}, []);

	useEffect(() => {
		const getUserList = async () => {
			const fetchedUserListData = await fetchUserList();
			setUserList(fetchedUserListData);
		};
		getUserList();
	}, []);

	useEffect(() => {
		const getChannelHistory = async () => {
			const fetchedChannelHistoryData = await fetchChannelHistory();
			setChannelHistory(fetchedChannelHistoryData);
		};
		getChannelHistory();
	}, []);

	console.log(channelList);
	console.log(userList);
	console.log(channelHistory);

	return (
		<main role="main">
			<div>
				<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<h1 className="message" data-qa="message">
					UserList:
					{userList.map((profile, index) => (
						<li key={index}>{profile.real_name}</li>
					))}
				</h1>
				<Link to="/about/this/site">About</Link>
			</div>
		</main>
	);
}

export default Home;
