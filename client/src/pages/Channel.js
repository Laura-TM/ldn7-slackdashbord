import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import SingleChannelChart from "./SingleChannelChart";
import slack_logo from "./slack_logo.png";
import "./Home.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Channel = () => {
	const { name, channelId } = useParams();
	const [userList, setUserList] = useState([]);
	const [message, setMessage] = useState("");
	const [reaction, setReaction] = useState("");
	const [averageMessages, setAverageMessages] = useState([]);
	const [averageReactions, setAverageReactions] = useState([]);
	const [numberOfUsers, setNumberOfUsers] = useState(0);

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
				setNumberOfUsers(body.length);
			})
			.catch((err) => {
				console.error(err);
			});

		fetch(`/api/channelSum/${channelId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body[0].total_message);
				setReaction(body[0].total_reaction);
				let messagesArray = [];
				let reactionsArray = [];
				let lastTwoWeeks = body.slice(-2);
				lastTwoWeeks.forEach((element) => {
					messagesArray.push(element.total_message / numberOfUsers);
					reactionsArray.push(element.total_reaction / numberOfUsers);
				});
				setAverageMessages(messagesArray);
				setAverageReactions(reactionsArray);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [channelId, numberOfUsers]);

	return (
		<main>
			<NavBar />
			<div>
				<h1 className="text-center">
					<img className="slack_logo" src={slack_logo} alt="Slack logo" />
					{name.replace(/^./, name[0].toUpperCase())} Channel Users
				</h1>
				<Table responsive borderless className="channelTable text-center">
					<thead className="thickRightBorder">
						<tr className="thickBottomBorder">
							<th colSpan="2">Trainee</th>
							<th colSpan="2">Current week</th>
							<th colSpan="2">Previous week</th>
						</tr>
						<tr className="thickBottomBorder">
							<th>#</th>
							<th>User name</th>
							<th>Messages</th>
							<th>Reactions</th>
							<th>Messages</th>
							<th>Reactions</th>
						</tr>
					</thead>
					<tbody>
						{userList.map((user, index) => (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>
									<Link
										style={{
											textDecoration: "none",
											color: "black",
											fontWeight: "lighter",
										}}
										to={`/user/${channelId}/${user.id}/${user.real_name}`}
									>
										{user.real_name}
									</Link>
								</td>
								<td></td>
								<td></td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<div>
				<SingleChannelChart
					messagesDataSet={averageMessages}
					reactionsDataSet={averageReactions}
				/>
			</div>
			<Footer />
		</main>
	);
};

export default Channel;
