import { Router } from "express";
import process from "process";

const router = new Router();
const axios = require("axios");

const getChannelList = async () => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/conversations.list`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getUserList = async () => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = "https://ldn7-test-workspace.slack.com/api/users.list";
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getUserInfo = async (userId) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/users.info?user=${userId}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
}

const getChannelHistory = async (channel, oldest, latest) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	let url = ""
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

export default router;
