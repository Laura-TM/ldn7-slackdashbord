import { Router } from "express";
import process from "process";

const router = new Router();
const axios = require("axios");
const slackWorkspace = "https://ldn7-test-workspace.slack.com";
// const slackWorkspace = "https://codeyourfuture.slack.com";

const getChannelList = async () => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/conversations.list`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getChannelUser = async (channelId) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/conversations.members?channel=${channelId}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getUserList = async () => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/users.list`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getUserInfo = async (userId) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/users.info?user=${userId}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getChannelHistory = async (channel, oldest, latest) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	let url = "";
	if (oldest === undefined || latest === undefined) {
		url = `${slackWorkspace}/api/conversations.history?channel=${channel}`;
	} else {
		url = `${slackWorkspace}/api/conversations.history?channel=${channel}&oldest=${oldest}&latest=${latest}`;
	}
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const findReaction = (reactions, userId) => {
	return reactions.filter((reaction) => reaction.users.includes(userId));
};

const getStat = async (channel, userId, oldest, latest) => {
	latest = latest == undefined ? "" : latest;
	const data = await getChannelHistory(channel, oldest, latest);
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

router.get("/channelList", async (req, res) => {
	const fetchChannelList = await getChannelList();
	res.status(200).json(fetchChannelList);
});

router.get("/userList", async (req, res) => {
	const fetchUserList = await getUserList();
	res.status(200).json(fetchUserList);
});

router.get("/channelUser/:channelId", async (req, res) => {
	const channelId = req.params.channelId;
	const fetchChannelUser = await getChannelUser(channelId);
	const output = Promise.all(
		fetchChannelUser.members.map(async (member) => {
			const userInfo = await getUserInfo(member);
			return userInfo.user;
		})
	)
		.then((data) => res.status(200).json(data))
		.catch(() => res.status(400));
});

router.get("/user/:channelId/:userId", async (req, res) => {
	const userId = req.params.userId;
	const channelId = req.params.channelId;
	let result = {
		userName: "",
		profile: "",
		statistics: [],
	};
	const userInfo = await getUserInfo(userId);
	const userName = userInfo.ok
		? userInfo.user.real_name
		: res.status(400).json("The user not found");
	result.userName = userName;
	result.profile = userInfo.user.profile;
	const now = new Date() / 1000;
	const weekInSeconde = now - 60 * 60 * 7 * 24;
	const newStatistics = await getStat(channelId, userId, weekInSeconde);
	result.statistics.push(newStatistics);
	res.status(200).json(result);
});

router.get("/avr/:channelId/:userId", async (req, res) => {
	const userId = req.params.userId;
	const channelId = req.params.channelId;
	let data = await getChannelHistory(channelId);

	if (data.ok && data.messages) {
		const timestampOfJoin = data.messages.find(
			(message) =>
				message.type == "message" &&
				message.subtype &&
				message.subtype == "channel_join" &&
				message.user == userId
		);

		const now = new Date();
		const joinDate = timestampOfJoin.ts * 1000;
		const weeks = Math.round((now - joinDate) / 604800000);
		let stat = await getStat(userId, timestampOfJoin.ts);
		stat.messageCount = stat.messageCount / weeks;
		stat.reactionCount = stat.reactionCount / weeks;
		res.json(stat);
	}
});

export default router;
