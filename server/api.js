import { Router } from "express";
import process from "process";

const router = new Router();
const axios = require("axios");

const getUserInfo = async (userId) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/users.info?user=${userId}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getChannelHistory = async (channel, oldest, latest) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	let url = "";
	if(oldest === undefined || latest === undefined) {
		url = `https://ldn7-test-workspace.slack.com/api/conversations.history?channel=${channel}`;
	}  else {
		url = `https://ldn7-test-workspace.slack.com/api/conversations.history?channel=${channel}&oldest=${oldest}&latest=${latest}`;
	}
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const findReaction = (reactions, userId) => {
	return reactions.filter((reaction) => reaction.users.includes(userId));
};

const getStat = async (userId, oldest,latest) => {
	latest = latest == undefined? "" : latest;
	console.log(latest);
	const data = await getChannelHistory("C027M110K9T", oldest, latest);
	const messageCount = data.messages.filter(
		(message) =>
			(message.user == userId && message.type == "message") ||
			(message.reply_users && message.reply_users.includes(userId))
	).length;
	const reactionCount = data.messages.filter(
		(message) =>
			message.reactions && findReaction(message.reactions, userId).length > 0
	).length;
	const newCount = {
		messageCount: messageCount,
		reactionCount: reactionCount,
	};
	return newCount;
};

router.get("/user/:userId", async (req,res)=>{
const userId = req.params.userId;
let result = {
	userName: "",
	statistics: [],
};
const userInfo = await getUserInfo(userId);
const userName = userInfo.ok
	? userInfo.user.real_name
	: res.status(400).json("The user not found");
result.userName = userName;
const now = new Date()/1000;
const oldest =now - 60*60*7*24;
const newStatistics= await getStat(userId,oldest);
console.log(newStatistics);
	result.statistics.push(newStatistics);
	res.status(200).json(result);
});

router.get("/avr/:userId", async(req,res)=>{
const userId=req.params.userId;
console.log(userId);
let data = await getChannelHistory("C027M110K9T");

	if (data.ok && data.messages) {
		const timestampOfJoin = data.messages.find(
			(message) =>
				message.type == "message" &&
				message.subtype &&
				message.subtype == "channel_join" &&
				message.user == userId
		);

		const now=new Date();
		const joinDate=timestampOfJoin.ts * 1000;
		const weeks = Math.round((now - joinDate) / 604800000);
		console.log(weeks);
		let stat =await getStat(userId,timestampOfJoin.ts);
		stat.messageCount=stat.messageCount/weeks;
		stat.reactionCount=stat.reactionCount/weeks;
		res.json(stat);
	}
});



export default router;
